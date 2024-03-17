import axios from 'axios';

export const login = async (data) => axios.post('http://localhost:3001/api/auth/login', data);
