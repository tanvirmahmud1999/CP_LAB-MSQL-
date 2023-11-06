import {React,Component} from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

import "./ScatterChart.css"
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

class ScatterChart extends Component{
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
            <div className='ScatterChart'>
                <Scatter data = {this.state.data}/>
            </div>
        )
    }
}
export default ScatterChart;