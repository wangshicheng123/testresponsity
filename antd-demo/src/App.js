import React from 'react';
import './App.css';
import { Button, Icon ,Row, Col} from 'antd';
import LeftNav from "./component/LeftNav";

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
        <Col span={4}>left
          <LeftNav></LeftNav>
        </Col>
        <Col span={20}>right</Col>
      </Row>
    </div>
  );
}

export default App;
