import  axios from 'axios';
import {getRedirectPath} from '../util';

const REGISTER_SUCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCESS:
      return {...state, msg: '', isAuth: true, ...action.payload, redirectTo: getRedirectPath(action.payload)};
    case ERROR_MSG:
      return{...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
}
//action
function registerSuccess (data) {
  return {type: REGISTER_SUCESS, payload: data}
}
function errorMsg (msg) {
  return {msg, type: ERROR_MSG};
}

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

