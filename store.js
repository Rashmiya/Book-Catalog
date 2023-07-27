import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import SignInReducer from '../src/pages/SignInPage/slices/SignInSlice';
import signInSaga from './pages/SignInPage/saga/SignInSaga';
import AllProductsSlice from './pages/AllProducts/AllProductsSlice';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    booksState:AllProductsSlice
  },
  middleware:[sagaMiddleware]
});
sagaMiddleware.run(signInSaga);
export default store;