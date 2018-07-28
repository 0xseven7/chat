// 合并所有的reducer
import {combineReducers} from 'redux';
import {user} from './redux/user.redux';
import {chatUser} from './redux/chat.user.redux'

export default combineReducers({user, chatUser});

