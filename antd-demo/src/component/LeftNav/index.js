import React, { Component } from "react";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuconfig";

const {SubMenu} =Menu;
export default class LeftNav extends Component {
    constructor(params) {
        super(params);
        this.state = {
            menuList: []
        };

    }
    createMenu = (menuList) => {
        return menuList.map((item) => {
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.path}>
                        {this.createMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.path}>
                    <Icon type={item.icon}></Icon>
                    {item.title}
                </Menu.Item>
            )
        });

    }

    componentWillMount = () => {
        let list = this.createMenu(menuList);
        this.setState({
            list
        });
    }

    render() {
        return (
            <Menu theme="dark" mode="inline">
                {this.state.list}
            </Menu>
        )
    }
}