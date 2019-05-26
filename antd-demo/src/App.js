import React from 'react';
import './App.css';
import { Button, Icon ,Row, Col,Table} from 'antd';
import LeftNav from "./component/LeftNav";
import Header from "./component/Header";
import Footer from "./component/Footer";
// import Home from "./pages/Home";

let Mock=require("mockjs");

function App(props) {
  // 设置图标的样式
  // let sty={ fontSize: '16px', color: '#f00' };
  let data=Mock.mock({
    // 随机生成1到十个数据组成的数组
    'list|1-10':[{
      // id从100开始进行加数
      'id|+1':100,
      // 字符串的重复次数为10次
      'name|10': "wqdq"
    }]
  })
  // console.log(data);

  // let Random=Mock.Random;
  // console.log(Random.email());
  // console.log(Mock.mock('@email'));
  // console.log(Mock.mock({email: "@email"}));
  // console.log(Random.cname());
  // console.log(Random.region());
  // console.log(Random.province());
  // console.log(Random.city());
  // console.log(Random.county());
  // console.log(Random.zip());


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
          <div className="home-content">
            {props.children}
          </div>
          <Footer></Footer>
        </Col>
      </Row>
    </div>
  );
}

export default App;
