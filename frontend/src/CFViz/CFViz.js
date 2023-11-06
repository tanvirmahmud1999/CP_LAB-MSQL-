import React, { Component } from "react";
import CFstat from "../res/CFStat/CFStat";
import "./CFViz.css"
class CFViz extends Component{
    constructor(props){
        super(props);
        this.inpRef = React.createRef();
        this.state = {
            handles : [],
        }
    }
    submit = () => {
        if(this.inpRef.current.value.length != 0)
        this.setState({
            handles : this.inpRef.current.value.split(",")
        })
        console.log(this.state);
    }
    render(){
        return (
            <div className="CFViz">
                <div className="CFViz-top">
                    <input type="text" ref={this.inpRef}></input>
                    <div onClick={this.submit}>submit</div>
                </div>
                <CFstat handles = {this.state.handles}></CFstat>
            </div>
        )
    }
}
export default CFViz;