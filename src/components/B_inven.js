import {Bar} from 'react-chartjs-2'
import { Component } from 'react'
import { FaHome, FaCheck } from 'react-icons/fa'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { db } from '../firebase/firebase'
import React, { useEffect } from 'react'
import B_Home from './B_Home'
import { useState } from 'react'

const B_inven = () => {

    const [status, setStatus] = useState("B_inven")
    const [infos, setInfos] = useState([])
    const [items, setItems] = useState([])
    const [color, setColor] = useState([])
    const [stock, setStock] = useState([])

    useEffect(async () => 
    {

        const citiesRef = db.collection('branch item master');
        const snapshot = await citiesRef.get();
        if (status === "B_inven") 
        {
          snapshot.forEach(doc => {
                var data = {
                item_code: doc.data().item_code,
                product: doc.data().product,
                price: doc.data().price,
                quantity_received: doc.data().quantity_received,
                quantity_remaining: doc.data().quantity_remaining
                }

                infos.push(data);
          });

          console.log(infos);

          for(var i=0; i<infos.length-1; i++)
          {
                for(var j=0; j<infos.length-i-1; j++)
                {
                    if(infos[j].quantity_remaining > infos[j+1].quantity_remaining)
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
              stock.push(infos[i].quantity_remaining);
              if(infos[i].quantity_remaining > 5)
              {
                color.push('green');
              }
              else
              {
                color.push('red');
              }
          }

          setStatus("Loaded");
        }
    });

    const [datasets, setDatasets] = useState([
        {
          label: 'Almost out of Stock',
          backgroundColor: color,
          borderWidth: 2,
          data: stock
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
            return <B_Home />
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
                            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Branch Inventory Insight</h1>
                        </header>
                        <div className="style3">
                            <h5>This analytic represents the stock of products in the inventory. You can monitor this to know when to re-stock.</h5>
                        </div>
                        <Bar
                            data={state}
                            options={{
                                title:{
                                display:true,
                                text:'Stock per item',
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

        if(status === "B_inven")
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
                                text:'Stock per Item',
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

export default B_inven
