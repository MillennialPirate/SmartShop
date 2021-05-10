

import { Component } from 'react';
import { useState } from 'react'
import Header from './Header'
import Procs from './Excluded_files/Procs'
import AddProc from './Excluded_files/AddProc';
import Proc from './Proc';
import EmptyPage from './EmptyPage';
import Home from './Proc_Home';
import Proc_item from './Proc_item';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {db} from '../firebase/firebase';
import React, {useEffect } from 'react';
const Proc_proc = () => {

  const style1 = {
    zoomIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
  }
  var [date, setDate] = useState("")
    const [available, setAvail] = useState(false)
    const [items, setItems] = useState([]);
    
  const [status, setStatus] = useState("Proc_proc")

  const [showAddTask, setshowAddTask] = useState(false)

  const [procs, setProcs] = useState([])

  const [currproc, setcurrProc] = useState([ ])


  const [procId, setProcId] = useState();
  //redirect
  const changeStatusToItem = (proc) => {
    // console.log(proc.id)
    setcurrProc(proc)
    setStatus("Proc_item")
  }

  //toggle avail
  const toggleAvail = (id) =>{
    setProcs(procs.map((proc) => proc.id === id ? {...proc, available: !proc.available} : proc))
  }

  //change status
  const changeStatus = () => {
    setStatus("Home")
  }
  const changeAdd = () => {
    setStatus("Add");
  }
  const onChangeDate = (e) => {
    e.preventDefault();
    date = String(e.target.value);
    console.log(date);

  }
  useEffect(async() => {
    const citiesRef = db.collection('Branch Procurement');
    const snapshot = await citiesRef.get();
    if(status === "Proc_proc")
    {
      snapshot.forEach(doc => {
        var data = {
          ProcId: doc.data().ProcId, 
          Date: doc.data().Date
        };
        
        
        console.log(data);
  
        procs.push(data);
        console.log(procs);
        
  
      });
      setStatus("Loaded");
    }
    
  });
  const save = async(e) => {
    e.preventDefault();
    var cntr = 0;
    const citiesRef = db.collection('Branch Procurement');
    const snapshot = await citiesRef.get();
    snapshot.forEach(doc => {
      cntr++;
    });
    var data = {
      ProcId: cntr+1, 
      Date: date
    };
    const res = await db.collection('Branch Procurement').add(data);
    procs.push(data);
    setStatus("Added");
  }
  const checkStatus = (status) => {
  
    if(status === "Proc_proc") {
      return (
          <div class="container1">
              <div className="child_container">
              <StyleRoot><div style ={style1.zoomIn}>
              <Header title="Manage your products here !"
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
        onchangeStatus={changeStatus} />
        {showAddTask ?
              <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
            <div className="form-control form">
                <label>Date</label>
                <input type="date"  required
                />
            </div>
            <div className="form-control form-control-check">
                <label>Status</label>
                <input type="checkbox" 
                />
            </div>
            <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
        </form> :

<EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above."
pic="/groceries.png"
area={1} />

}

              </div>
              </StyleRoot>
              </div>
          </div>
      )
    }
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
              <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
            <div className="form-control form">
                <label>Date</label>
                <input type="date"  required
                />
            </div>
            <div className="form-control form-control-check">
                <label>Status</label>
                <input type="checkbox" 
                />
            </div>
            <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
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

      {procs.length > 0 ?
      <div class="FixedHeightContainer">
    <div class="Content">
        {
            procs.map((proc) => (
            <Proc key={proc.ProcId} proc={proc} 
            onStatusToItem={changeStatusToItem} 
            onAvail={toggleAvail}/>
        ))}  
    </div>
</div> :
        <EmptyPage text="There are nothing entered currently." 
        pic="/empty.jpg" 
        area={2} />
     }
      </div>
      </StyleRoot>
      </div>
  </div>
   }
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
              <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
            <div className="form-control form">
                <label>Date</label>
                <input type="date"  required
                />
            </div>
            <div className="form-control form-control-check">
                <label>Status</label>
                <input type="checkbox" 
                />
            </div>
            <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
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
    {procs.length > 0 ?
      <div class="FixedHeightContainer">
    <div class="Content">
        {
            procs.map((proc) => (
            <Proc key={proc.ProcId} proc={proc} 
            onStatusToItem={changeStatusToItem} 
            onAvail={toggleAvail}/>
        ))}  
    </div>
</div> :
        <EmptyPage text="There are nothing entered currently." 
        pic="/empty.jpg" 
        area={2} />
     }
    </div>
    </StyleRoot>
    </div>
</div>
   }

    if(status === "Home") {
      return <Home />
    }

    if(status === "Proc_item") {
        return <Proc_item  currproc={currproc}  />
    }
  }
  return checkStatus(status)  
}

export default Proc_proc