import { joiResolver } from "@hookform/resolvers/joi";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "./Login.validation";

const Login = () => {
  const { login, loginErrors, isAuthenticated } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
    navigate("/");
  };

  return (
    <>
      <h2>Login</h2>
      {loginErrors && <p style={{ color: "red" }}>Failed to login</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </>
        <>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
