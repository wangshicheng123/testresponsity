import React, {Component} from "react"

export default class B extends Component{
    constructor(params){
        super(params);
        // console.log(this.props);
    }
    render(){
        console.log(this.props);
        return (
            <div>
                <h3>
                    B页面---{this.props.match.params.name}
                </h3>
            </div>
        )
    }
}