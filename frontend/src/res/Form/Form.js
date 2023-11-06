import React, { Component } from "react";
import "./Form.css"
class Form extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Form">
                {this.props.children}
            </div>
        )
    }
}
export default Form;