import React, {Component} from "react"

export default class A extends Component{
    constructor(params){
        super(params);
        // console.log(this.props);
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <h3>
                    A页面-----{this.props.match.params.age}
                </h3>
            </div>
        )
    }
}