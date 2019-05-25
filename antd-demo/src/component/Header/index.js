import React, { Component } from "react";
import "./index.css"
import formTime from "../../utils/formTime";
export default class Header extends Component {
    constructor(params) {
        super(params);
        this.state={
            time: ""
        }
    }

    componentWillMount(){
        setInterval(() => {
            let now=new Date();
            let time=formTime(now);
            this.setState({
                time
            });
        }, 1000);
    }

    render() {
        return (
            <div className="header">
                <div className="header-content">
                    <span>欢迎，Endl</span>
                    <a>退出</a>
                </div>
                <div className="header-time">
                    <span>{this.state.time}</span>
                </div>
            </div>
        )
    }
}