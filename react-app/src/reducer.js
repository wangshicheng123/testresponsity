import {combineReducers} from "redux";

// state要有初始值
let  num =(state=0,action)=>{
    console.log(state,action);
    switch(action.type){
        case "ADD":
            return state+state.payload;
        case "REDUCE":
            return state-1;
        default:
            return state;
    }
}

//
export default combineReducers({
    num
})