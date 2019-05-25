import React ,{Component} from "react";
import {withRouter} from "react-router-dom";

export default withRouter(class E extends Component{
    constructor(params){
        super(params);
    }

    render(){
        return (
            <div>
                <button onClick={()=>{
                    // 注意通过this.props.history进行访问
                    // 注意如果不是通过Route跳转的页面需要对组件使用withRouter进行包裹
                    // console.log(this.props.history,"测试history");
                    this.props.history.push("/c");
                }}>编程式导航跳转到C页面</button>
            </div>
        )
    }
})