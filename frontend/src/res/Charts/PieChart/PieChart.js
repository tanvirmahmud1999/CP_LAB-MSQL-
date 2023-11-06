import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { Component } from 'react';
import "./PieChart.css"
ChartJS.register(ArcElement, Tooltip, Legend);
class PieChart extends Component{
    state = {
        data : {}
    }
    constructor(props){
        super(props);
        
        this.state = {
            data : props.data,
        };
        console.log(props);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data:this.props.data
            });
        }
    }
    render(){
        return(
            <div className='PieChart'>
                <Pie data = {this.state.data}/>
            </div>
        )
    }
}
export default PieChart;