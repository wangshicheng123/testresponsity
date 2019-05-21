import React from 'react';
import { BrowserRouter as Router, Route,Link,Switch} from "react-router-dom";
import Home from "./components/Home";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";


function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        ---------
        <Link to="/a/250">A页面</Link>
        ---------
        <Link to="/b/xiaohong">B页面</Link>
        ---------
        <Link to="/c">C页面</Link>
        ---------
        <Link to="/render">render页面</Link>
        ---------
        <Link to="/children">children页面</Link>

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
          console.log("children",props.match);
          return (<div>
            <h3>children子页面</h3>
          </div>
        )}}></Route>


      </Router>
    </div>
  );
}

export default App;
