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
import Invoice from './Invoice';
import { FaProcedures } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'

const Cart = ({uid}) => {
  const style1 = {
    slideInLeft: {
      animation: 'x 2s',
      animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
    }
  }
  const style2 = {
    slideInRight: {
      animation: 'x 2s',
      animationName: Radium.keyframes(slideInRight, 'slideInRight')
    }
  }
  const style3 = {
    slideInUp: {
      animation: 'x 1s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
  }
  const [status, setStatus] = useState("Home");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const goBack = (e) => {
    e.preventDefault();
    setStatus("Back");
  }
  const viewItems = (e) => {
    e.preventDefault();
    if(items.length > 0)
      setStatus("view");
    else
      setStatus("noview");
  }
  const proceed = (e) => {
    e.preventDefault();
    var cost = 0;
    items.map((item) => {
      cost += (parseInt(item.price)*parseInt(item.quantity));
    });
    console.log(items);
    console.log(cost);
    setTotal(cost);
    setStatus("Pay");
  }

  const cancel = (e) => {

    items.map(async (item) => {     
      console.log(item.doc_id);
      const res1 = await db.collection('Cart').doc(String(item.doc_id)).delete();
    });
    alert("Your cart has been cleared successfully !");
    setStatus("Back");
  }

  const remove = async(item) => {

    var flag = 0;
    console.log(item.item_code);

    for (var i = 0; i < items.length; i++) 
    {
      if (items[i].item_code === item.item_code) 
      {
        items.splice(i, 1);
        i--;
        flag = 1;
      }
    }

    const res = await db.collection('Cart').doc(String(item.doc_id)).delete();
    
    if (status === "view" || status === "noview") 
    {
      if(items.length > 0)
        setStatus("viewagain");
      else
        setStatus("noview")
    }
    else 
    {
      if(items.length > 0)
        setStatus("view");
      else
        setStatus("noview")
    }
  }

 useEffect(async() => {
  const citiesRef = db.collection('Cart');
  const snapshot = await citiesRef.get();
  var cost = 0;
  if(status === "Home")
  {
    snapshot.forEach(doc => {
      if(doc.data().customer_id === String(uid))
      {
        var item = {
          doc_id: doc.id,
          item_code: doc.data().item_code,
          product: doc.data().product,
          price : doc.data().price, 
          quantity: doc.data().quantity
        }
        
        console.log(item);
        items.push(item);
      }
    }); 
  }
  console.log(items);
 })
  const checkStatus = () => {
    if(status === "Home")
    {
      return  <div className="container">
      <div style={{ textAlign: "center" }}>
        <h1>Shopping Cart</h1>
        <img src={Pic} style={{ width: "200px", height: "200px", borderRadius: "0%" }} />
        <h1>Here are the items added!</h1><h4><a href = "#back" onClick={(e) => { goBack(e) }}>Go back</a></h4>{"  "}<h4><a href = "#back" onClick={(e) => { viewItems(e) }}>View Items</a></h4>
        
      </div>
    </div>
    }

    if(status === "viewagain")
    {
      return <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1>Shopping Cart</h1>
          <img src={Pic} style={{ width: "200px", height: "200px", borderRadius: "0%" }} />
          <h1>Here are the items added!</h1><h4><a href = "#back" onClick={(e) => { goBack(e) }}>Go back</a></h4>
          <div style={{ paddingTop: "2%" }}></div>

          <div class="row">
            <div >
              {
                items.map((item) => (
                  <div class="col-lg-6 col-md-12">
                    <div style={{ paddingTop: "5%" }}></div>
                    <div class="card1 card-1">
                      <h3 style={{ color: "black" }}>{item.product}</h3>
                      <p style={{ color: "black" }}>Price: Rs.{item.price}</p>
                      <p style={{ color: "black" }}>quantity: {item.quantity}</p>
                      <div style={{ color: "black" }}>
                        <div style={{ paddingTop: "1%" }}>
                        <button className="addtocart6" onClick = {() => { remove(item) }}><a href="#" style={{color:"white"}}>Remove</a></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
          <div style ={{paddingTop:"5%"}}></div>
          <button className="addtocart5" onClick = {(e) => { proceed(e) }}><a href="#" style={{color:"white"}}>Proceed</a></button>
          <button className="addtocart5" onClick = {(e) => { cancel(e) }}><a href="#" style={{color:"white"}}>Cancel</a></button>
        </div>
      </div>
    }

    if(status === "view")
    {
      return <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1>Shopping Cart</h1>
          <img src={Pic} style={{ width: "200px", height: "200px", borderRadius: "0%" }} />
          <h1>Here are the items added!</h1><h4><a href = "#back" onClick={(e) => { goBack(e) }}>Go back</a></h4>
          <div style={{ paddingTop: "2%" }}></div>

          <div class="row">
            <div >
              {
                items.map((item) => (
                  <div class="col-lg-6 col-md-12">
                    <div style={{ paddingTop: "5%" }}></div>
                    <div class="card1 card-1">
                      <h3 style={{ color: "black" }}>{item.product}</h3>
                      <p style={{ color: "black" }}>Price: Rs.{item.price}</p>
                      <p style={{ color: "black" }}>quantity: {item.quantity}</p>
                      <div style={{ color: "black" }}>
                        <div style={{ paddingTop: "1%" }}>
                        <button className="addtocart6" onClick = {() => { remove(item) }}><a href="#" style={{color:"white"}}>Remove</a></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
          <div style ={{paddingTop:"5%"}}></div>
          <button className="addtocart5" onClick = {(e) => { proceed(e) }}><a href="#" style={{color:"white"}}>Proceed</a></button>
          <button className="addtocart5" onClick = {(e) => { cancel(e) }}><a href="#" style={{color:"white"}}>Cancel</a></button>
        </div>
      </div>
    }

    if(status === "noview")
    {
      return <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1>Shopping Cart</h1>
          <img src={Pic} style={{ width: "200px", height: "200px", borderRadius: "0%" }} />
          <h1>No items in cart</h1><h4><a href = "#back" onClick={(e) => { goBack(e) }}>Go back</a></h4>
          <div style={{ paddingTop: "2%" }}></div>
        </div>
      </div>
    }

    if(status === "Back")
    {
      return <C_Prod uid ={uid}/>
    }
    if(status === "Pay")
    {
      return <Invoice uid = {uid} price = {total*100} items = {items}/>
    }
  }
  return checkStatus(status);
}
export default Cart;