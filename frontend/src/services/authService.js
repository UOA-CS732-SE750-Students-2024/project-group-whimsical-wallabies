import axiosApiInstance from '../utils/axiosApiInstance';
import { API_PATH } from '../utils/urlRoutes';

export const login = async (data) => axiosApiInstance.post(API_PATH.auth.login, data);
export const signup = async (data) => axiosApiInstance.post(API_PATH.auth.signup, data);
export const addDog = async (data) => axiosApiInstance.post(API_PATH.dog.add, data);
export const dogProfile = async (data) => axiosApiInstance.get(API_PATH.dog.profile, data);
export const dogs = async (data) => axiosApiInstance.get(API_PATH.dog.dogs, data);
