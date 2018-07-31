import axios from 'axios';
import {getRedirectPath} from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOGOUT = 'LOGPOUT';
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
};

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '',  ...action.payload, redirectTo: getRedirectPath(action.payload)};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOAD_DATA:
      return {...state, ...action.payload};
    case LOGOUT:
       return {...initState, redirectTo: '/login'};
    default:
      return state;
  }
}

/**
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */

/**
 *
 * @param msg
 * @returns {{msg: *, type: string}}
 */
function errorMsg (msg) {
  return {msg, type: ERROR_MSG};
}
function authSuccess (data) {
  return {type: AUTH_SUCCESS, payload: data};
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
        dispatch(authSuccess({user, pwd, type}));
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
        console.log(res.data.data);
        dispatch(authSuccess(res.data.data));
      } else {
        console.log(res.data);
        dispatch(errorMsg(res.data.msg));
      }
    });
  };

}
export function loadData (userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}
export function update (data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
export function logoutCommit () {
  return dispatch => {
    dispatch({type: LOGOUT});
  }
}