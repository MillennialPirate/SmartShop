import { Component } from 'react';
import { useState } from 'react'
import Header from './Header'
import Supp from './Excluded_files/Supp'
import EmptyPage from './EmptyPage';
import B_Home from './B_Home';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {db} from '../firebase/firebase';
import { FaTimes } from 'react-icons/fa'
import React, {useEffect } from 'react';

const B_Supp = () => {

  const style1 = {
    zoomIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
  }

  var [code, setCode] = useState(0)
  var [stock, setStock] = useState(0)
  var [price, setPrice] = useState();
  var [product, setProduct] = useState();

  const [status, setStatus] = useState("B_Supp")
  const [showAddTask, setshowAddTask] = useState(false)
  const [supps, setSupps] = useState([ ])

  const onChangeCode = (e) => {
    e.preventDefault();
    code = parseInt(e.target.value);
    console.log(code);
  }

  const onChangeStock = (e) => {
    e.preventDefault();
    stock = parseInt(e.target.value);
    console.log(stock);
  }

  const changeStatus = (status) => {
    setStatus("Home");
  }

  useEffect(async() => {
    const citiesRef = db.collection('branch item master');
    const snapshot = await citiesRef.get();
    if(status === "B_Supp")
    {
      snapshot.forEach(doc => {
        var data = {
          item_code: doc.data().item_code, 
          quantity_received: doc.data().quantity_received,
          quantity_remaining: doc.data().quantity_remaining,
          product: doc.data().product,
          price: doc.data().price
        };
   
        console.log(data);
        supps.push(data);
        console.log(supps);  
  
      });
      setStatus("Loaded");
   }    
 });

 const save = async(e) => {

  if(!code){
      alert('Please select an item code')
      return
  }
  if(!stock){
      alert('Please mention stock')
      return
  }

  e.preventDefault();
 
  const citiesRef = db.collection('branch item master');
  const snapshot = await citiesRef.get();
  
  const itemsRef = db.collection('Item Master');
  const snapshot1 = await itemsRef.get();

  var flag = 0;
  var flag1 = 0;
  var avail = false;

  snapshot1.forEach(doc =>
  {
    var data = {
      ItemId: doc.data().ItemId,
      ProductName: doc.data().ProductName,
      price: doc.data().price,
      stock: doc.data().stock,
      ProcId: doc.data().ProcId
    }

    if(code === data.ItemId)
    {
      if(stock <= data.stock)
      {
        var data = {
          ItemId: data.ItemId, 
          ProductName: data.ProductName,
          price: data.price,
          stock: data.stock-stock,
          ProcId: data.ProcId
        };

        product = data.ProductName;
        price = data.price;
      
        const res = db.collection('Item Master').doc(String(data.ItemId)).set(data);
        flag1 = 1;
      }
      avail = true;
    }

  });

  if(flag1 === 0 && avail === true)
  {
    alert("Stock exceeded limit !");
  }

  if(avail === false)
  {
    alert("Item code not valid !");
  }

  else if(avail === true && flag1 === 1)
  {
    snapshot.forEach(doc => 
    {
      var data = {
        item_code: doc.data().item_code, 
        quantity_received: doc.data().quantity_received,
        quantity_remaining: doc.data().quantity_remaining,
        product: doc.data().product,
        price: doc.data().price
      }

      if(data.item_code === code)
      {

        supps.pop(data);

        var data = {
          item_code: code,
          quantity_received: stock + data.quantity_received,
          quantity_remaining: stock + data.quantity_remaining,
          product: product,
          price: price
        }

        const res = db.collection('branch item master').doc(String(code)).set(data);
        supps.push(data);

        flag = 1;
      }

    });

    if(flag === 0)
    {
      var data = {
        item_code: code, 
        quantity_received: stock,
        quantity_remaining: stock,
        product: product,
        price: price
      };

      const res = db.collection('branch item master').doc(String(code)).set(data);
      supps.push(data);
    }
  }
  
    
  if(status === "Added")
    setStatus("Loaded")
  else
    setStatus("Added");
}


const onDelete = async (id) => {

  var flag = 0;
  console.log(id);

  for (var i = 0; i < supps.length; i++) 
  {
    if (supps[i].item_code === id && supps[i].quantity_remaining < 1) 
    {
      supps.splice(i, 1);
      i--;
      flag = 1;
    }
  }

  if(flag === 1)
  {
    const res = await db.collection('branch item master').doc(String(id)).delete();
  }

  else
  {
    alert("Not allowed to delete Item");
  }

  if (status === "Deleted") 
  {
    setStatus("Loaded");
  }
  else 
  {
    setStatus("Deleted");
  }
}


  const checkStatus = (status) => {

    if(status === "Home")
    {
      return <B_Home />
    }
    
    if(status === "B_Supp") {
      return (
        <div class="container1">
        <div className="child_container">
        <StyleRoot><div style ={style1.zoomIn}>
        
        <Header title="Manage your products here !"
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onchangeStatus={changeStatus} />
        {showAddTask ?

        <form className="control-item">
          <div className="form-control form1">
            <label>Item Code</label>
            <input type="number" 
            placeholder="Item Code" 
            
            onChange={(e) => onChangeCode(e)} required />
          </div>
          <div className="form-control form">
            <label>Stock</label>
            <input type="number" 
            placeholder="Stock"
            onChange={(e) => onChangeStock(e)} required />
          </div>
          <input className="bt btn-block1" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
        </form> :

        <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
        pic="/groceries.png"
        area={1} />

        }

        </div>
        </StyleRoot>
        </div>
  
        <div className="child_container">
        <StyleRoot><div style ={style1.zoomIn}>
        {supps.length > 0 ?
        <div class="FixedHeightContainer">
          <div class="Content">
          {
              supps.map((supp) => (  
                <div className = "task" >
                <h3>Item code: {supp.item_code}<FaTimes style ={{color: "red",
                cursor: "pointer"}} onClick= {() => onDelete(supp.item_code)}/></h3>
                <p>Product: {supp.product}</p>
                <p>Price: {supp.price}</p>
                <p>Stock: {supp.quantity_remaining}</p>
                </div>
          ))}  
          </div>
        </div> :
        <EmptyPage text="There are no items entered currently." 
        pic="/empty.jpg" 
        area={2} />
     }
      </div>
      </StyleRoot>
      </div>
      </div> 
      )
    }
    
   //-------------------------------------------------------------------------------------------------------------
   //-------------------------------------------------------------------------------------------------------------
   //-------------------------------------------------------------------------------------------------------------
   //-------------------------------------------------------------------------------------------------------------
   //-------------------------------------------------------------------------------------------------------------

   if(status === "Loaded")
   {
      return <div class="container1">
      <div className="child_container">
      <StyleRoot><div style ={style1.zoomIn}>
          
      <Header title="Manage your products here !"
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onchangeStatus={changeStatus} />
        {showAddTask ?

        <form className="control-item">
          <div className="form-control form1">
            <label>Item Code</label>
            <input type="number" 
            placeholder="Item Code" 
            
            onChange={(e) => onChangeCode(e)} required />
          </div>
          <div className="form-control form">
            <label>Stock</label>
            <input type="number" 
            placeholder="Stock"
            onChange={(e) => onChangeStock(e)} required />
          </div>
          <input className="bt btn-block1" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
        </form> :

        <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
        pic="/groceries.png"
        area={1} />

      }

      </div>
      </StyleRoot>
      </div>

      <div className="child_container">
      <StyleRoot><div style ={style1.zoomIn}>
      {supps.length > 0 ?
      <div class="FixedHeightContainer">
        <div class="Content">
        {
            supps.map((supp) => (  
              <div className = "task" >
              <h3>Item code: {supp.item_code}<FaTimes style ={{color: "red",
              cursor: "pointer"}} onClick= {() => onDelete(supp.item_code)}/></h3>
              <p>Product: {supp.product}</p>
              <p>Price: {supp.price}</p>
              <p>Stock: {supp.quantity_remaining}</p>
              </div>
        ))}  
        </div>
      </div> :
      <EmptyPage text="There are no items entered currently." 
      pic="/empty.jpg" 
      area={2} />
   }
    </div>
    </StyleRoot>
    </div>
    </div> 
  }
   
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  
  if(status === "Added")
   {
    return <div class="container1">
    <div className="child_container">
    <StyleRoot><div style ={style1.zoomIn}>
        
      <Header title="Manage your products here !"
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onchangeStatus={changeStatus} />
        {showAddTask ?

        <form className="control-item">
          <div className="form-control form1">
            <label>Item Code</label>
            <input type="number" 
            placeholder="Item Code" 
            
            onChange={(e) => onChangeCode(e)} required />
          </div>
          <div className="form-control form">
            <label>Stock</label>
            <input type="number" 
            placeholder="Stock"
            onChange={(e) => onChangeStock(e)} required />
          </div>
          <input className="bt btn-block1" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
        </form> :

        <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
        pic="/groceries.png"
        area={1} />
      }

    </div>
    </StyleRoot>
    </div>

    <div className="child_container">
    <StyleRoot><div style ={style1.zoomIn}>
    {supps.length > 0 ?
      <div class="FixedHeightContainer">
        <div class="Content">
        {
            supps.map((supp) => (  
              <div className = "task" >
              <h3>Item code: {supp.item_code}<FaTimes style ={{color: "red",
              cursor: "pointer"}} onClick= {() => onDelete(supp.item_code)}/></h3>
              <p>Product: {supp.product}</p>
              <p>Price: {supp.price}</p>
              <p>Stock: {supp.quantity_remaining}</p>
              </div>
        ))}  
        </div>
      </div> :
      <EmptyPage text="There are no items entered currently." 
      pic="/empty.jpg" 
      area={2} />
   }
  </div>
  </StyleRoot>
  </div>
  </div> 
  }

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  if(status === "Deleted")
   {
      return <div class="container1">
      <div className="child_container">
      <StyleRoot><div style ={style1.zoomIn}>
          
      <Header title="Manage your products here !"
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onchangeStatus={changeStatus} />
        {showAddTask ?

        <form className="control-item">
          <div className="form-control form1">
            <label>Item Code</label>
            <input type="number" 
            placeholder="Item Code" 
            
            onChange={(e) => onChangeCode(e)} required />
          </div>
          <div className="form-control form">
            <label>Stock</label>
            <input type="number" 
            placeholder="Stock"
            onChange={(e) => onChangeStock(e)} required />
          </div>
          <input className="bt btn-block1" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
        </form> :

        <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
        pic="/groceries.png"
        area={1} />

      }

      </div>
      </StyleRoot>
      </div>

      <div className="child_container">
      <StyleRoot><div style ={style1.zoomIn}>
      {supps.length > 0 ?
      <div class="FixedHeightContainer">
        <div class="Content">
        {
            supps.map((supp) => (  
              <div className = "task" >
              <h3>Item code: {supp.item_code}<FaTimes style ={{color: "red",
              cursor: "pointer"}} onClick= {() => onDelete(supp.item_code)}/></h3>
              <p>Product: {supp.product}</p>
              <p>Price: {supp.price}</p>
              <p>Stock: {supp.quantity_remaining}</p>
              </div>
        ))}  
        </div>
      </div> :
      <EmptyPage text="There are no items entered currently." 
      pic="/empty.jpg" 
      area={2} />
   }
    </div>
    </StyleRoot>
    </div>
    </div> 
  }

  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------------------------

  }
  return checkStatus(status)  
}

export default B_Supp
