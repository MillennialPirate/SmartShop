import { React, useEffect } from 'react';
import { useState } from 'react'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Shop from './Shop';
import Pic from './cart.svg';
import './Card.css';
import { db } from '../firebase/firebase';
import RazorPanel from './razorpay';
import C_Prod from './C_Prod';
import Cart from './Cart';
import Pay from './pay.svg';
const Invoice = ({uid, price, items}) => {
    const [status, setStatus] = useState("invoice");
    const goBack = (e) => {
        e.preventDefault();
        setStatus("cart");
    }
    useEffect(() => {
        console.log(price);
    })
    const checkStatus = (status) =>
    {
        if(status === "invoice")
        {
            return <div class = "container">
                <img src = {Pay}/>
                <h1>Click here to pay!</h1>
                <div class = "col-lg-12">
                    <RazorPanel price = {price} items = {items} uid = {uid}/>
                </div>
                
            </div>;
        }
        if(status === "cart")
        {
            return <Cart uid = {uid}/>
        }
    }
    return checkStatus(status);
    
}
export default Invoice;