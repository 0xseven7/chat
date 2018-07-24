// import React from 'react';
// import { connect } from 'react-redux'
// import { addGun, reduceGun, addGunAsync } from './index.redux';
// // const mapStateProps = function (state) {
// //   return {
// //     num: state
// //   }
// // }
// // const actionCreators = { addGun, reduceGun, addGunAsync };
// // export default connect(mapStateProps, actionCreators)(App);
// //
// /**
//  *  connect两个参数
//  * state中的属性添加到props中
//  * state中的方法添加到props中
//  */
// @connect(
//   state => ({num: state}),
//   {addGun, reduceGun, addGunAsync}
// )
//
// class App extends React.Component {
//   render() {
//
//     return (
//       <div >
//         <h2>现在有机枪{this.props.num}</h2>
//         <button onClick={() => this.props.addGun()}>申请武器</button>
//         <button onClick={() => this.props.reduceGun()}>较少武器</button>
//         <button onClick={() => this.props.addGunAsync()}>较少武器</button>
//       </div>
//     )
//   }
// }
// export default App;
//
