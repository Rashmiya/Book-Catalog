import axios from 'axios';
import { LoginDetails } from '../utils/interface';
const baseUrl = 'http://localhost:8000/customer';


export const getUserService = async (customer: LoginDetails) => {
  const res = await axios.post(baseUrl + '/login', customer, {
    withCredentials: true,
  });
  return res;
};
export const insertCustomerService = async (customer: LoginDetails) => {
  console.log('save service calling...');
  const res = await axios.post(baseUrl + '/register', customer, {
    withCredentials: true,
  });
  return res;
};

export const getUserDetails = async () => {
  console.log('details service calling...');
  const res = await axios.get(baseUrl + '/userDetail', {
    withCredentials: true,
  });
  return res;
};

export const logoutUserService = async () => {
  const res = await axios.get(baseUrl +'/logout', {
    withCredentials: true,
  });
  return res;
};