/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginDetails {
    userRoll?: string;
    email: string;
    name?: string;
    password?: string;
    
  }
export interface BookModel{
  book_id?:string;
  booK_bid?:number;
    bookName:string;
    bookAuthor:string;
    bookQty:number | string;
    bookPrice:number | string;
    bookType:string;
    bookImage?:null;
}
export interface OrderModel{
    oid?:number;
    customer_name:string;
    itemList:object;
    totalAmount:number;
    shippingAddress:string;
    orderDate:Date
}