import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React, { Component } from 'react';
import "./DoughnutChart.css"
ChartJS.register(ArcElement, Tooltip, Legend);
class DoughnutChart extends Component{
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
            <div className='DoughnutChart'>
                <Doughnut data = {this.state.data}/>
            </div>
        )
    }
}
export default DoughnutChart;