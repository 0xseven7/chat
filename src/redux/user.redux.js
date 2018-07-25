import axios from 'axios';
import {getRedirectPath} from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
  redirectTo: '',
  isAuth: 'false',
  msg: '',
  user: '',
  type: ''
};

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload, redirectTo: getRedirectPath(action.payload)};
    case LOGIN_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.payload, redirectTo: getRedirectPath(action.payload)};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOAD_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

/**
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
function registerSuccess (data) {
  return {type: REGISTER_SUCCESS, payload: data};
}

/**
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
function loginSuccess (data) {
  return {type: LOGIN_SUCCESS, payload: data};
}


/**
 *
 * @param msg
 * @returns {{msg: *, type: string}}
 */
function errorMsg (msg) {
  return {msg, type: ERROR_MSG};
}

/**
 *
 * @param user {String}
 * @param pwd
 * @param repeatPwd
 * @param type
 * @returns {*}
 */
export function register ({user, pwd, repeatPwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码不能为空');
  }
  if (pwd !== repeatPwd) {
    return errorMsg('两次输入的密码不相同');
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data);
        dispatch(registerSuccess({user, pwd, type}));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login ({user, pwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码不能为空');
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd, type}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };

}
export function loadData (userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}

