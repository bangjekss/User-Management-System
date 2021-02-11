import Axios from 'axios';
import { api_url, notification } from '../../favordb';
import {
  API_LOADING_START,
  API_LOADING_FAILED,
  API_LOADING_SUCCESS,
  API_REGIS_LOGIN,
  API_USER_LOGOUT,
  NULLIFY_ERROR,
} from '../type';
import Swal from 'sweetalert2';

const userdb_url = `${api_url}/userdb`;

export const loginAction = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      const respone = await Axios.post(`${userdb_url}/login`, userData);
      console.log(respone.data.id);
      if (!respone.data.id) {
        dispatch({
          type: API_LOADING_SUCCESS,
        });
        return Swal.fire({
          title: `Login failed!!`,
          text: 'Email/username does not match with password, please try again',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      const { id, username, email, alamat, roleID, verified, token } = respone.data;
      console.log(respone.data);
      localStorage.setItem('token', token);
      dispatch({
        type: API_REGIS_LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
      dispatch({
        type: 'NULLIFY_VALIDATION',
      });
      Swal.fire({
        title: `Welcome back ${username}!! \\(^.^)/`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      const token = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const respone = await Axios.post(`${userdb_url}/keep-login`, {}, headers);
      const { id, username, email, alamat, roleID, verified } = respone.data;
      console.log(respone.data);
      dispatch({
        type: API_REGIS_LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      const data = {
        icon: 'info',
        title: 'Login session has expired',
      };
      notification(data);
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      localStorage.removeItem('token');
      dispatch({
        type: API_USER_LOGOUT,
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
      Swal.fire({
        title: `Bye bye!!`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const validation = (value) => {
  return async (dispatch) => {
    const { username, email, password, cpassword } = value;
    const regex_email = /[\w-\.]+(@[\w-\.]+\.)+[\w\-]{2,4}$/;
    const regex_password = /(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*\-\_=<>,\.?]).{8,16}$/;
    const validation_UsernameEmail = { username, email };
    let response = await Axios.post(
      `${userdb_url}/register-live-validation`,
      validation_UsernameEmail
    );
    if (!response.data) {
      response.data = [
        {
          ...response.data,
          username: null,
          email: null,
        },
      ];
    }
    if (!response.data.username) {
      dispatch({
        type: 'IS_VALID_USERNAME',
        payload: true,
      });
      dispatch({
        type: 'IS_INVALID_USERNAME',
        payload: false,
      });
    } else {
      dispatch({
        type: 'IS_VALID_USERNAME',
        payload: false,
      });
      dispatch({
        type: 'IS_INVALID_USERNAME',
        payload: true,
      });
    }
    if (email.match(regex_email)) {
      dispatch({
        type: 'IS_VALID_EMAIL',
        payload: true,
      });
      dispatch({
        type: 'IS_INVALID_EMAIL',
        payload: false,
      });
      if (!response.data.email) {
        dispatch({
          type: 'IS_VALID_EMAIL',
          payload: true,
        });
        dispatch({
          type: 'IS_INVALID_EMAIL',
          payload: false,
        });
      } else {
        dispatch({
          type: 'IS_VALID_EMAIL',
          payload: false,
        });
        dispatch({
          type: 'IS_INVALID_EMAIL',
          payload: true,
        });
      }
    } else {
      dispatch({
        type: 'IS_VALID_EMAIL',
        payload: false,
      });
      dispatch({
        type: 'IS_INVALID_EMAIL',
        payload: true,
      });
    }
    if (password.match(regex_password)) {
      dispatch({
        type: 'IS_VALID_PASSWORD',
        payload: true,
      });
      dispatch({
        type: 'IS_INVALID_PASSWORD',
        payload: false,
      });
    } else {
      dispatch({
        type: 'IS_VALID_PASSWORD',
        payload: false,
      });
      dispatch({
        type: 'IS_INVALID_PASSWORD',
        payload: true,
      });
    }
    if (cpassword === password) {
      dispatch({
        type: 'IS_VALID_CPASSWORD',
        payload: true,
      });
      dispatch({
        type: 'IS_INVALID_CPASSWORD',
        payload: false,
      });
    } else {
      dispatch({
        type: 'IS_VALID_CPASSWORD',
        payload: false,
      });
      dispatch({
        type: 'IS_INVALID_CPASSWORD',
        payload: true,
      });
    }
  };
};

export const registerAction = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      const response = await Axios.post(`${userdb_url}/register`, userData);
      const { id, username, email, roleID, verified, token } = response.data;
      localStorage.setItem('token', token);
      dispatch({
        type: API_REGIS_LOGIN,
        payload: { id, username, email, roleID, verified },
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
      dispatch({
        type: 'NULLIFY_VALIDATION',
      });
      Swal.fire({
        title: `Welcome ${userData.username} \\(^.^)/`,
        text: 'Your account has been registered',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const sendChangePasswordAction = (user) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      console.log(user);
      const response = await Axios.post(`${userdb_url}/send-change-password`, { user });
      const { email } = response.data.user;
      console.log(email);
      dispatch({ type: API_LOADING_SUCCESS });
      dispatch({ type: 'NULLIFY_VALIDATION' });
      Swal.fire({
        icon: 'success',
        title: 'Delievered',
        text: `An email has been sent to '${email}'. Please check your inbox or spam`,
        timer: 5000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: API_LOADING_FAILED, error: error.message });
      Swal.fire({
        title: 'Ooppss..!!',
        text: `Somothing gonna wrong, please contact our CS!!\nERR MESSAGE\n${error.message}`,
        icon: 'error',
      });
    }
  };
};

export const validationChangePassword = (value) => {
  return async (dispatch) => {
    dispatch({ type: API_LOADING_START });
    try {
      const { password, cpassword } = value;
      const regex_password = /(?=.*[\d])(?=.*[A-Z])(?=.*[`~!@#$%^&*()\-\_\.,<>?]).{8,16}$/;
      if (password.match(regex_password)) {
        dispatch({ type: 'IS_VALID_PASSWORD', payload: true });
        dispatch({ type: 'IS_INVALID_PASSWORD', payload: false });
      } else {
        dispatch({ type: 'IS_VALID_PASSWORD', payload: false });
        dispatch({ type: 'IS_INVALID_PASSWORD', payload: true });
      }
      if (cpassword === password) {
        dispatch({ type: 'IS_VALID_CPASSWORD', payload: true });
        dispatch({ type: 'IS_INVALID_CPASSWORD', payload: false });
      } else {
        dispatch({ type: 'IS_VALID_CPASSWORD', payload: false });
        dispatch({ type: 'IS_INVALID_CPASSWORD', payload: true });
      }
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: API_LOADING_FAILED, error: error.message });
      Swal.fire({
        title: 'Ooppss..!!',
        text: `Somothing gonna wrong, please contact our CS!!\nERR MESSAGE\n${error.message}`,
        icon: 'error',
      });
    }
  };
};

export const changePasswordAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_LOADING_START });
    try {
      const { token, password } = data;
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token, password);
      await Axios.post(`${userdb_url}/change-password`, { password }, headers);
      dispatch({ type: API_LOADING_SUCCESS });
      Swal.fire({
        icon: 'success',
        title: 'Successfully',
        text: 'Your account password has been changed with the new one',
        timer: 5000,
        timerProgressBar: true,
      });
      dispatch({ type: 'NULLIFY_VALIDATION' });
    } catch (error) {
      console.log(error);
      dispatch({ type: API_LOADING_FAILED, error: error.message });
      Swal.fire({
        title: 'Ooppss..!!',
        text: `Somothing gonna wrong, please contact our CS!!\nERR MESSAGE\n${error.message}`,
        icon: 'error',
      });
    }
  };
};
