import React from 'react';
import { BrowserRouter as Router, Route,Link,Switch, Redirect,NavLink} from "react-router-dom";
import Home from "./components/Home";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import E from "./components/E";

import {add,reduce} from "./action";
import store from './store';
import {connect} from "react-redux";
import "./app.css"

function D(props){
  return(
    <div>
      <Link to={props.to}>{props.children}</Link>
    </div>
  )
}

function App(props) {
  return (
    <div className="App">

      这是一个SPA页面-------{props.num}
      <button onClick={()=>{
        // 调用action方法的方式
        store.dispatch(add())
      }}>add</button>
      <button onClick={()=>{
        store.dispatch(reduce())
      }}>reduce</button>
      <hr></hr>
      <Router>
        <NavLink exact to="/">首页</NavLink>
        ---------
        <NavLink exact to="/a/250">A页面</NavLink>
        ---------
        <NavLink exact to="/b/xiaohong">B页面</NavLink>
        ---------
        <NavLink exact isActive={()=>{
          return true;
        }} to="/c">C页面</NavLink>
        ---------
        <Link to="/render">render页面</Link>
        ---------
        <Link to="/children">children页面</Link>
        ---------
        <Link to="/redirect">redirect页面</Link>
        ---------
        <D to="/render">自定义组件</D>hm
        ---------
        <E></E>
        {/* <Route path="/" component={Home}></Route>
        <Route path="/a" component={A}></Route>
        <Route path="/b" component={B}></Route> */}

        {/* <Switch>
          <Route path="/a" component={A}></Route>
          <Route path="/b" component={B}></Route>
          <Route path="/" component={Home}></Route>
        </Switch> */}

        <Route exact path="/" component={Home}></Route>
        <Route exact path="/a/:age" component={A}></Route>
        <Route exact path="/b/:name" component={B}></Route>
        <Route exact path="/c" component={C}></Route>
        <Route exact path="/render" render={()=>{
          return (
          <div>
            <h3>render页面</h3>
          </div>)
        }}></Route>
        <Route exact path="/children" children={(props)=>{
          // 当点击的是这个组件，match才有值
          // console.log("children",props.match);
          return (<div>
            <h3>children子页面</h3>
          </div>
        )}}></Route>
        <Route exact path="/redirect" render={()=>{
          return <Redirect to="/"/>
        }}></Route>

      </Router>
    </div>
  );
}

let mapStateToProps=(state)=>{
  return {
    num: state.num
  }
}

export default connect(mapStateToProps)(App);
