import React from 'react';
import { Component } from 'react';
import './Gallary.css'
import lab1 from '../../Image/lab1.jpg'
import lab2 from '../../Image/lab2.jpg'
import lab3 from '../../Image/lab3.jpg'
class Gallary extends Component{
    render(props){
        return (
            <div className='Gallary' id = "Glr">
                <div className='top'>
                        <div className='top-left'>
                                <div className='top-left-left'>
                                        <div className='sec-1 sec'></div>
                                        <div className='sec-2 sec'></div>
                                </div>
                                
                                <div className='top-left-right sec-3 sec'>
                                        <img src ={lab1}/>
                                </div>

                        </div>
                        <div className='top-right'>
                                <div className='top-right-left'>
                                        <div className='sec-4 sec'><img src ={lab3}/></div>
                                        <div className='sec-5 sec'></div>
                                </div>
                                <div className='top-right-right'>
                                        <div className='sec-6 sec'></div>
                                        <div className='sec-7 sec'><img src ={lab3}/></div>
                                </div>
                        </div>
                </div>
                
                <div className='bottom'>
                        <div className='bottom-left'>
                                <div className='bottom-left-left sec-8 sec' ><img src ={lab2}/></div>
                                <div className='bottom-left-right sec-9 sec'><img src ={lab2}/></div>
                        </div>
                        <div className='bottom-right'>
                                <div className='sec-10 sec'></div>
                        </div>
                </div>


            </div>
        );
    }
}
export default Gallary;
