import React,{Component} from "react"

export default class C extends Component{
    constructor(params){
        super(params);
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <h3>
                    C页面
                </h3>
            </div>
        )
    }
}