/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { LoginDetails } from '../../../utils/interface';
import { loginUserAction, logOutUserAction, registerUserAction, refreshFunction, saveUserAction, setUserDetails } from '../slices/SignInSlice';
import { getUserDetails, getUserService, insertCustomerService, logoutUserService } from '../../../services/CustomerServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//services and slices


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action: AnyAction): any {
  try {
    const response: boolean = yield call(getUserService, action.payload);
    
    if (response) {
      const userData: LoginDetails = yield call(getUserDetails);
  
      const userDataCookie = cookies.get('userData');
      console.log(userDataCookie);
      
      yield put(saveUserAction(true));
      yield put(
        setUserDetails({
          userRoll: userDataCookie.userRoll,
          name: userDataCookie.name,
        })
      );
      const userDetails = {
        userRoll: userDataCookie.userRoll,
        name: userDataCookie.name,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      //alert('can not find user,check email & password..!');
      toast.error('can not find user,check email & password..!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    //alert('can not find user,check email & password..!');
    toast.error('can not find user,check email & password..!', {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error);
  }
}
  
function* logOutUser(): any {
  try {
    console.log('done 22');
    const response: any = yield call(logoutUserService);
    if (response) {
      yield put(saveUserAction(false));
      yield put(setUserDetails([]));
    }
  } catch (error) {
    console.log(error);
  }
}
  
function* registerUser(action: AnyAction): any {
  try {
    const response = yield call(
      insertCustomerService,
      action.payload
    );
    console.log(response);
    if (response.data===true) {
      const userData: LoginDetails = yield call(getUserDetails);
      console.log(userData);
      const userDataCookie = cookies.get('userData');
      yield put(saveUserAction(true));
      yield put(
        setUserDetails({
          userRoll: userDataCookie.userRoll,
          name: userDataCookie.name,
        })
      );
      const userDetails = {
        userRoll: userDataCookie.userRoll,
        name: userDataCookie.name,
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      toast.success('User Added Successfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.warn('User Already Exists!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error('Error occurred while registering user', {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

function* signInSaga() {
  yield takeEvery(loginUserAction, loginUser);
  yield takeEvery(logOutUserAction, logOutUser);
  yield takeEvery(registerUserAction, registerUser);
}

export default signInSaga;