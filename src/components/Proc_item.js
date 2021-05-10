
import { FaTimes } from 'react-icons/fa'
import { Component } from 'react';
import { useState } from 'react'
import Header from './Header'
import EmptyPage from './EmptyPage';
import Proc_proc from './Proc_proc';
import { fadeIn } from 'react-animations';
import { zoomIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { FaSave } from 'react-icons/fa';
import { db } from '../firebase/firebase';
import React, { useEffect } from 'react';

const Proc_item = ({ currproc }) => {

  const style1 = {
    fadeIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
  }

  const style2 = {
    zoomIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
  }

  const [status, setStatus] = useState("Proc_item")

  const [showAddTask, setshowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  const [price, setPrice] = useState();
  const [product, setProduct] = useState();
  const [stock, setStock] = useState();
  var [code, setCode] = useState(0)
  
  //add product
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  //remove product
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle price
  const togglePrice = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, available: !task.available } : task))
  }

  //change status
  const changeStatus = (status) => {
    setStatus("Proc_proc");
  }

  const changeProduct = (e) => {
    e.preventDefault();
    setProduct(e.target.value);
    console.log(product);
  }
  const changeStock = (e) => {
    e.preventDefault();
    setStock(e.target.value);
    console.log(stock);
  }
  const onChangeCode = (e) => {
    e.preventDefault();
    code = parseInt(e.target.value);
    setCode(code);
    console.log(code);
  }
  const changePrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
    console.log(price);
  }
  useEffect(async () => {
    console.log(currproc.ProcId);
    const citiesRef = db.collection('Item Master');
    const snapshot = await citiesRef.get();
    if (status === "Proc_item") {
      snapshot.forEach(doc => {
        var data = {
          ItemId: doc.data().ItemId,
          ProductName: doc.data().ProductName,
          price: doc.data().price,
          stock: doc.data().stock,
          ProcId: doc.data().ProcId
        }
        if (data.ProcId === currproc.ProcId) {
          tasks.push(data);
        }

      });
      console.log(tasks);
      setStatus("loaded");
    }

  });
  const onDelete = async (id) => {
    console.log(id);
    var flag = 0;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].ItemId === id && tasks[i].stock === 0) {
        tasks.splice(i, 1);
        i--;
        flag = 1;
      }
    }
    //delete from the databse
    if(flag === 1){
    const res = await db.collection('Item Master').doc(String(id)).delete();
    }

    else{
      alert("Delete not permitted !");
    }

    if (status === "deleted") {
      setStatus("loaded");
    }
    else {
      setStatus("deleted");
    }
  }

  const save = async (e) => {
    if (!stock) {
      alert('Please mention stock')
    }
    if (!price) {
      alert('Please mention the price')
    }
    e.preventDefault();
    var cntr = 0;
    const citiesRef = db.collection('Item Master');
    const snapshot = await citiesRef.get();
    var flag = 0;
    snapshot.forEach(doc => {
      if(code === doc.data().ItemId)
      {
        alert("Item already exits");
        flag  = 1;
      }
    });
    if(flag === 0){
    var data = {
      ItemId: code,
      ProductName: product,
      stock: parseInt(stock),
      price: price,
      ProcId: currproc.ProcId
    }
    const res = await db.collection('Item Master').doc(String(code)).set(data);
    tasks.push(data);
    if (status === "added")
      setStatus("loaded");
    else
      setStatus("added");}
  }
  const checkStatus = (status) => {

    if (status === "Proc_item") {
      return (
        <div class="container1">

          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <Header title="Manage your products here !"
                onAdd={() => setshowAddTask(!showAddTask)}
                showAdd={showAddTask}
                onchangeStatus={changeStatus} />
              {showAddTask ? 
               <form className="control-item" >
               <div className="form-control form1">
                 <label>Item Code</label>
                 <input type="number" 
                 placeholder="Item Code" 
                 onChange={(e) => onChangeCode(e)} required /></div>
                 <div className="form-control form1">
                   <label>Product</label>
                   <input type="text" name="product"
                     placeholder="Product name" onChange={(e) => { changeProduct(e) }}
                   />
                 </div>
                 <div className="form-control form">
                   <label>Stock</label>
                   <input type="number" name="stock"
                     placeholder="Stock" onChange={(e) => { changeStock(e) }}
                   />
                 </div>
                 <div className="form-control form">
                   <label>Price</label>
                   <input type="text" placeholder="Price" name="price" onChange={(e) => { changePrice(e) }}
                   />
                 </div>
                 <div className="form-control form1-control-check">
                   <label>Available</label>
                   <input type="checkbox"
                   />
                 </div>
                 <input className="bt btn-block" type="submit" value="Save" onClick={(e) => { save(e) }} />
               </form> :
                <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
                  pic="/groceries.png"
                  area={1} />}
            </div>
            </StyleRoot>
          </div>
          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <div className="style4" >
                <h3>Adding items for procurement number {currproc.ProcId}</h3>
              </div>

              {tasks.length > 0 ?
              <div class="FixedHeightContainer">
                <div class="Content">
                  {
                    tasks.map((task) => (
                      <div>
                        <div className = {`task ${task.available ? 'reminder' : ''}`} >
                          {console.log(task.ItemId)}
                          <h3>{task.ItemId} <FaTimes style ={{color: "red",
                          cursor: "pointer"}} onClick= {() => onDelete(task.ItemId)}/></h3>
                          <p>Name : {task.ProductName}</p>
                          <p>Stock: {task.stock}</p>
                          <p>Price: {task.price}</p>
                      </div>
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
    if (status === "deleted") {
      return (
        <div class="container1">

          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <Header title="Manage your products here !"
                onAdd={() => setshowAddTask(!showAddTask)}
                showAdd={showAddTask}
                onchangeStatus={changeStatus} />
              {showAddTask ? 
              <form className="control-item" >
              <div className="form-control form1">
                <label>Item Code</label>
                <input type="number" 
                placeholder="Item Code" 
                onChange={(e) => onChangeCode(e)} required /></div>
                <div className="form-control form1">
                  <label>Product</label>
                  <input type="text" name="product"
                    placeholder="Product name" onChange={(e) => { changeProduct(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Stock</label>
                  <input type="number" name="stock"
                    placeholder="Stock" onChange={(e) => { changeStock(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Price</label>
                  <input type="text" placeholder="Price" name="price" onChange={(e) => { changePrice(e) }}
                  />
                </div>
                <div className="form-control form1-control-check">
                  <label>Available</label>
                  <input type="checkbox"
                  />
                </div>
                <input className="bt btn-block" type="submit" value="Save" onClick={(e) => { save(e) }} />
              </form> :
                <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
                  pic="/groceries.png"
                  area={1} />}
            </div>
            </StyleRoot>
          </div>
          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <div className="style4" >
                <h3>Adding items for procurement number {currproc.id}</h3>

              </div>
              {tasks.length > 0 ?
              <div class="FixedHeightContainer">
                <div class="Content">
                  {
                    tasks.map((task) => (
                      <div>
                        <div className = {`task ${task.available ? 'reminder' : ''}`} >
                          {console.log(task.ItemId)}
                          <h3>{task.ItemId} <FaTimes style ={{color: "red",
                          cursor: "pointer"}} onClick= {() => onDelete(task.ItemId)}/></h3>
                          <p>Name : {task.ProductName}</p>
                          <p>Stock: {task.stock}</p>
                          <p>Price: {task.price}</p>
                      </div>
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
    if (status === "loaded") {
      return (
        <div class="container1">

          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <Header title="Manage your products here !"
                onAdd={() => setshowAddTask(!showAddTask)}
                showAdd={showAddTask}
                onchangeStatus={changeStatus} />
              {showAddTask ? 
              <form className="control-item" >
              <div className="form-control form1">
                <label>Item Code</label>
                <input type="number" 
                placeholder="Item Code" 
                onChange={(e) => onChangeCode(e)} required /></div>
                <div className="form-control form1">
                  <label>Product</label>
                  <input type="text" name="product"
                    placeholder="Product name" onChange={(e) => { changeProduct(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Stock</label>
                  <input type="number" name="stock"
                    placeholder="Stock" onChange={(e) => { changeStock(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Price</label>
                  <input type="text" placeholder="Price" name="price" onChange={(e) => { changePrice(e) }}
                  />
                </div>
                <div className="form-control form1-control-check">
                  <label>Available</label>
                  <input type="checkbox"
                  />
                </div>
                <input className="bt btn-block" type="submit" value="Save" onClick={(e) => { save(e) }} />
              </form> :
                <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
                  pic="/groceries.png"
                  area={1} />}
            </div>
            </StyleRoot>
          </div>
          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <div className="style4" >
                <h3>Adding items for procurement number {currproc.id}</h3>
              </div>
              {tasks.length > 0 ?
              <div class="FixedHeightContainer">
                <div class="Content">
                  {
                    tasks.map((task) => (
                      <div>
                        <div className = {`task ${task.available ? 'reminder' : ''}`} >
                          {console.log(task.ItemId)}
                          <h3>{task.ItemId} <FaTimes style ={{color: "red",
                          cursor: "pointer"}} onClick= {() => onDelete(task.ItemId)}/></h3>
                          <p>Name : {task.ProductName}</p>
                          <p>Stock: {task.stock}</p>
                          <p>Price: {task.price}</p>
                      </div>
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

        </div>)
    }

    if (status === "added") {

      return (
        <div class="container1">

          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <Header title="Manage your products here !"
                onAdd={() => setshowAddTask(!showAddTask)}
                showAdd={showAddTask}
                onchangeStatus={changeStatus} />
              {showAddTask ? 
              <form className="control-item" >
              <div className="form-control form1">
                <label>Item Code</label>
                <input type="number" 
                placeholder="Item Code" 
                onChange={(e) => onChangeCode(e)} required /></div>
                <div className="form-control form1">
                  <label>Product</label>
                  <input type="text" name="product"
                    placeholder="Product name" onChange={(e) => { changeProduct(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Stock</label>
                  <input type="number" name="stock"
                    placeholder="Stock" onChange={(e) => { changeStock(e) }}
                  />
                </div>
                <div className="form-control form">
                  <label>Price</label>
                  <input type="text" placeholder="Price" name="price" onChange={(e) => { changePrice(e) }}
                  />
                </div>
                <div className="form-control form1-control-check">
                  <label>Available</label>
                  <input type="checkbox"
                  />
                </div>
                <input className="bt btn-block" type="submit" value="Save" onClick={(e) => { save(e) }} />
              </form> :
                <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
                  pic="/groceries.png"
                  area={1} />}
            </div>
            </StyleRoot>
          </div>
          <div className="child_container">
            <StyleRoot><div style={style2.zoomIn}>
              <div className="style4" >
                <h3>Adding items for procurement number {currproc.id}</h3>
              </div>
              {tasks.length > 0 ?
              <div class="FixedHeightContainer">
                <div class="Content">
                  {
                    tasks.map((task) => (
                      <div>
                        <div className = {`task ${task.available ? 'reminder' : ''}`} >
                          {console.log(task.ItemId)}
                          <h3>{task.ItemId} <FaTimes style ={{color: "red",
                          cursor: "pointer"}} onClick= {() => onDelete(task.ItemId)}/></h3>
                          <p>Name : {task.ProductName}</p>
                          <p>Stock: {task.stock}</p>
                          <p>Price: {task.price}</p>
                      </div>
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


        </div>)
    }
    if (status === "Proc_proc") {
      return <Proc_proc />
    }
  }

  return checkStatus(status)
}

export default Proc_item