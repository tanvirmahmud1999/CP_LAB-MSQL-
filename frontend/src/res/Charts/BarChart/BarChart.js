import React, { Component } from 'react';
import "./BarChart.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
class BarChart extends Component{
    state = {
        data : {}
    }
    constructor(props){
        super(props);
        
        this.state = {
            data :  props.data
        };
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
            <div className='BarChart'>
                <Bar data = {this.state.data}/>
            </div>
        )
    }
}
export default BarChart;