import axiosApiInstance from "../utils/axiosApiInstance";
import { API_PATH } from "../utils/urlRoutes";

export const login = async (data) =>
  axiosApiInstance.post(API_PATH.auth.login, data);
