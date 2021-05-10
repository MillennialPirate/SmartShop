import {Bar} from 'react-chartjs-2'
import { Component } from 'react'
import { FaHome, FaCheck } from 'react-icons/fa'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { db } from '../firebase/firebase'
import React, { useEffect } from 'react'
import Proc_Home from './Proc_Home'
import { useState } from 'react'

const Proc_demand = () => {

    const [status, setStatus] = useState("Proc_sales")
    const [infos, setInfos] = useState([])
    const [items, setItems] = useState([])
    const [color, setColor] = useState([])
    const [quantity, setQuantity] = useState([])

    useEffect(async () => 
    {
        const citiesRef = db.collection('Item sales');
        const snapshot = await citiesRef.get();
        console.log(snapshot);

        if (status === "Proc_sales") 
        {
          console.log("in if for proc_sales status");

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
            return <Proc_Home />
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
                            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Product Demand Insight</h1>
                        </header>
                        <div className="style3">
                            <h5>This analytic represents the demand of products overall. You can monitor this to know the demands of products and determine sale strategies.</h5>
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

        if(status === "Proc_sales")
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

export default Proc_demand
