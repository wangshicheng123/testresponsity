import React, { Component } from "react";
import "./index.css"
export default class Footer extends Component{
    constructor(params){
        super(params);
    }

    render(){
        return (
            <div className="footer-content">
                唯创网讯版权所有
            </div>
        )
    }
}