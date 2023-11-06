import React, { Component } from "react";
import './WavyText.css'
class WavyText extends Component {
    render (){
        let children = [];
        for(let i = 0; i < this.props.children.length; i++) children.push(this.props.children[i]);
        return (
            <div className="WavyText">
                {
                    children.map((c , index) => {
                        return <span key = {index}>{c}</span>
                    })
                }
            </div>
        );
    }

}

export default WavyText;
