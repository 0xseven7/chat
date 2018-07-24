import {
    createStore
} from 'redux';


// 新建store 
// 通过reducer建立
// 通过老的state 生成新的state
const ADD_GUN = 'increase';
const REDUCE_GUN = 'reduce';
export function counter(state = 0, action) {
    switch (action.type) {
        case 'reduce':
            return state - 1
        case 'increase':
            return state + 1
        default:
            return 10
    }
}
const store = createStore(counter);
// 派发时间
function listener() {
    const current = store.getState();
    console.log(`现在有${current}把枪`)
}
store.subscribe(listener);
store.dispatch({
    type: 'reduce'
});
store.dispatch({
    type: 'increase'
});
store.dispatch({
    type: '123'
});
export function addGun() {
    return {
        type: ADD_GUN
    }
};
export function reduceGun() {
    return {
        type: REDUCE_GUN
    }
}
export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch({ type: ADD_GUN })
        }, 2000)
    }
}