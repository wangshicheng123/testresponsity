import React from 'react';
import './App.css';
import { Button, Icon ,Row, Col} from 'antd';
import LeftNav from "./component/LeftNav";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./Home";

function App() {
  // 设置图标的样式
  // let sty={ fontSize: '16px', color: '#f00' };
  return (
    <div className="App">
      {/* <h1>首页</h1>
      <Button type="primary" icon="home">primary</Button>
      <Button type="danger" shape="round">danger</Button>
      <Button type="dashed" block>dashed</Button>
      <Button type="link" loading>link</Button>
      <hr/>
      <Icon type="sync" spin style={sty}></Icon> */}

      <Row>
        <Col span={5} className="left-nav">
          <div className="img-container">
            <img src="/imgs/logo.png"></img>
          </div>
          <LeftNav></LeftNav>
        </Col>
        <Col span={19}>
          <Header></Header>
          <Home></Home>
          <Footer></Footer>
        </Col>
      </Row>
    </div>
  );
}

export default App;
