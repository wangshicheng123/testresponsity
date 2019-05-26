import React, { Component } from "react";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuconfig";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
export default class LeftNav extends Component {
    constructor(params) {
        super(params);
        this.state = {
            menuList: []
        };

    }
    createMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={<span><Icon type={item.icon}></Icon><span>{item.title}</span></span>} key={item.path}>
                        {this.createMenu(item.children)}
                    </SubMenu>
                )
            }

            return (
                <Menu.Item key={item.path}>
                    <Link to={item.path}>
                        <Icon type={item.icon ? item.icon : "bulb"}></Icon>
                        {item.title}
                    </Link>
                </Menu.Item>
            )
        });

    }
    // 在组件将要挂载之前执行
    componentWillMount = () => {
        let list = this.createMenu(menuList);
        this.setState({
            list
        });
    }

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultOpenKeys={["/admin/teacher"]}>
                {this.state.list}
            </Menu>
        )
    }
}