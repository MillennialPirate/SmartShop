import {Bar} from 'react-chartjs-2'
import { Component } from 'react'
import { FaHome, FaCheck } from 'react-icons/fa'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { db } from '../firebase/firebase'
import React, { useEffect } from 'react'
import C_Home from './C_Home'
import { useState } from 'react'

const C_Trend = () => {

    const [status, setStatus] = useState("C_Trend")
    const [infos, setInfos] = useState([])
    const [items, setItems] = useState([])
    const [color, setColor] = useState([])
    const [quantity, setQuantity] = useState([])

    useEffect(async () => 
    {
        const citiesRef = db.collection('Item sales');
        const snapshot = await citiesRef.get();
        console.log(snapshot);

        if (status === "C_Trend") 
        {
          console.log("in if for C_Trend status");

          snapshot.forEach(doc => {

              console.log("in snapshot");

                var data = {
                    item_code: doc.data().item_code,
                    product: doc.data().product,
                    revenue: doc.data().revenue,
                    quantity: doc.data().quantity
                }

                infos.push(data);
          });

          console.log(infos);

          for(var i=0; i<infos.length-1; i++)
          {
                for(var j=0; j<infos.length-i-1; j++)
                {
                    if(infos[j].quantity < infos[j+1].quantity)
                    {
                        var temp = infos[j];
                        infos[j] = infos[j+1];
                        infos[j+1] = temp;
                    }
                }
          }   

          console.log(infos);
          
          for(var i=0; i<infos.length; i++)
          {
              items.push(infos[i].product);
              quantity.push(infos[i].quantity);
              if(infos[i].quantity > 100)
              {
                color.push('blue');
              }
              else
              {
                color.push('purple');
              }
          }

          setStatus("Loaded");
        }
    });

    const [datasets, setDatasets] = useState([
        {
          label: 'Most demanded',
          backgroundColor: color,
          borderWidth: 2,
          data: quantity
        }
    ])

    const state = {
        labels: items,
        datasets: datasets
    }

    const onchangeStatus = () => {
        setStatus("Home");
    }

    const checkStatus = (status) =>{

        if(status === "Home")
        {
            return <C_Home />
        }

        if(status === "Loaded")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus} ><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="child_container">
                        <header className="header"> 
                            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product Trends Insight</h1>
                        </header>
                        <div className="style3">
                            <h5>Hello customer ! Below you can see the currently trending products. This may help you decide your cart. Happy shopping !</h5>
                        </div>
                        <Bar
                            data={state}
                            options={{
                                title:{
                                display:true,
                                text:'Demand per item',
                                fontSize:40
                                },
                                legend:{
                                display:false,
                                position:'right'
                                },
                                responsive:true
                            }}
                        />
                    </div>
                </div>
            )
        }

        if(status === "C_Trend")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus} ><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="child_container">
                        <Bar
                            data={state}
                            options={{
                                title:{
                                display:true,
                                text:'Demand per Item',
                                fontSize:40
                                },
                                legend:{
                                display:false,
                                position:'right'
                                },
                                responsive:true
                            }}
                        />
                    </div>
                </div>
            )
        }
    }
    
    return checkStatus(status)
}

export default C_Trend
