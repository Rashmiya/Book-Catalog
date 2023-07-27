import { createSlice } from '@reduxjs/toolkit';

export const AllProductsSlice = createSlice({
  name: 'booksState',
  initialState: {
    books: [],
    updates:false
  },
  reducers: {
    saveBooksAction: (state, action) => {
      state.books = action.payload;
    },
    setUpdates:(state,action)=>{
      state.updates=action.payload;
    }
  },
});

export const { saveBooksAction,setUpdates } = AllProductsSlice.actions;

export default AllProductsSlice.reducer;