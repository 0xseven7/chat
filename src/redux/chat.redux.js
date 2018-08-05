import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:5000');


const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
  chatMsg: [],
  unread: 0,
  users: {}
};

export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatMsg: action.payload.msgs,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length
      };
    // case MSG_READ:
    case MSG_RECV:
      const n = action.payload.data.to === action.payload.userId ? 1 : 0;
      console.log(action.payload.data);
      return {...state, chatMsg: [...state.chatMsg, action.payload.data], unread: state.unread + n};
    case MSG_READ:
      const {from, num} = action.payload;
      return {
        ...state, unread: state.unread - num, chatMsg: state.chatMsg.map(v => {
          return {
            ...v,
            read: from === v.from ? true : v.read
          }
        })
      };
    default:
      return state;
  }
}

function msgLists (msgs, users, userId) {
  return {type: MSG_LIST, payload: {msgs, users, userId}};
}

function msgRec (data, userId) {
  return {type: MSG_RECV, payload: {data, userId}};
}

function msgRead ({from, to, num}) {
  return {type: MSG_READ, payload: {from, to, num}};
}

//action
export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        // success
        const userId = getState().user._id;
        dispatch(msgLists(res.data.msgs, res.data.users, userId));
        console.log(userId);
      } else {
      }
    });
  };
}

export function sendMsg (from, to, msg) {
  console.log(from);
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg});
  };
}

export function recMsg () {
  return (dispatch, getState) => {
    console.log('render');

    socket.on('recMsg', function (data) {
      dispatch(msgRec(data, getState().user._id));
    });
  };
}

export function readMsg (from) {
  return ((dispatch, getState) => {
    axios.post('/user/readmsg', {from}).then(res => {
      const userId = getState().user.id;
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data.num);
        dispatch(msgRead({from, userId, num: res.data.num}));
      }
    });
  });
}