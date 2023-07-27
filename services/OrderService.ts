//import axios from 'axios';
import axiosApiInstance from '../utils/interceptor';
import {  OrderModel } from '../utils/interface'; 
const baseUrl = 'http://localhost:8000/order';

export const insertOrderService = async (order: OrderModel) => {
  const res = await axiosApiInstance.post(baseUrl, order,{
    withCredentials: true,
  });
  return res;
};