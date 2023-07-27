import axios from 'axios';
import { BookModel } from '../utils/interface'; 
const baseUrl = 'http://localhost:8000/book';


export const getAllBooksService = async () => {
  const res = await axios.get(baseUrl);
  return res;
};

export const fetchBookService = async (bid: string ) => {
  const res = await axios.get(`${baseUrl}/details/${bid}`);
  return res;
};
export const insertBookService = async (book: BookModel) => {
  const res = await axios.post(baseUrl, book);
  return res;
};

export const deleteBookService = async (id: string | undefined) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res;
};

export const updateStudentService = async (book: any) => {
  const res = await axios.put(baseUrl, book);
  return res;
};