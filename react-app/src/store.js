import {createStore} from "redux";
import reducer from "./reducer";

// 初始状态量
let initialState={
    num: 0
}

// 使用createStore创建store
//  第一个参数是reducer, 第二个参数是参数初始化状态

let store=createStore(reducer,initialState);

export default store;