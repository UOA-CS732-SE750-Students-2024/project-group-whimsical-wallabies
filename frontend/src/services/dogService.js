import axiosApiInstance from '../utils/axiosApiInstance';
import { API_PATH } from '../utils/urlRoutes';

export const addDog = async (data) => axiosApiInstance.post(API_PATH.dog.add, data);
export const dogProfile = async (data) => axiosApiInstance.get(API_PATH.dog.profile, data); //not sure if this is correct
export const dogDashboard = async (data) => axiosApiInstance.get(API_PATH.dog.dogDashboard, data); //not sure if this is correct
