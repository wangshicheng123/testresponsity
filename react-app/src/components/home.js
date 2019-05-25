import React, {Component} from  "react";
import { Prompt } from "react-router-dom";

export default class Home extends Component{
    constructor(params){
        super(params);
        this.state={
            isLeave: true
        }
    }
    render(){
        return(
            <div>
                <h3>homg页面</h3>
                <button onClick={()=>{
                    this.props.history.push("/c");
                }}>跳转到c页面</button>
                <Prompt when={this.state.isLeave} message={(location)=>{
                    console.log(location);
                    return "您是否要离开首页";
                }}></Prompt>
            </div>
        )
    }
}