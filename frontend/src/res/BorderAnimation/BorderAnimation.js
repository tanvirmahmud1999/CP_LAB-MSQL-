import React, { Component } from "react";
import './BorderAnimation.css'
class BorderAnimation extends Component{
    render(){
        return (
            <div className="BorderAnimation">
            {this.props.children}
            </div>
        )
    }
}
export default BorderAnimation;