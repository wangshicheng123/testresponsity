import React, { Component } from "react";
import {Table} from "antd";
import "./index.css"
import axios from "axios";
export default class Home extends Component {
    constructor(params) {
        super(params);
        this.state={
          data: []
        }
    }

    componentWillMount=()=>{
      axios.get(" https://www.easy-mock.com/mock/5cea42cc10d66f369865f616/endl/list").then((res)=>{
        // console.log(res);
        this.setState({
          data: res.data.data.student
        });
        // console.log(this.state.data);
      });
    }

    render() {
        let columns=[
            {
              title: "Name",
              dataIndex: "name",
              key: "name"
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email"
            },
            {
              title: "Id",
              dataIndex: "id",
              key: "id"
            },
            {
              title: "School",
              dataIndex: "school",
              key: "school"
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address"
            }
          ];
        //   let data=[
          //   {
          //     key: "1",
          //     name: "boss",
          //     age: 12,
          //     address: "部落冲突市，大本营县"
          //   },
          //   {
          //     key: "2",
          //     name: "worker",
          //     age: 13,
          //     address: "部落冲突市，建筑小窝县"
          //   },
          //   {
          //     key: "3",
          //     name: "wangwu",
          //     age: 16,
          //     address: "部落冲突市，弓箭女王大殿县"
          //   }
          // ]
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}></Table>
            </div>
        )
    }
}