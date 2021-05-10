//Proc_proc

// import { Component } from 'react';
// import { useState } from 'react'
// import Header from './Header'
// import Procs from './Procs'
// import AddProc from './AddProc'
// import EmptyPage from './EmptyPage';
// import Home from './Proc_Home';
// import Proc_item from './Proc_item';
// import { zoomIn } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';

// const Proc_proc = () => {

//   const style1 = {
//     zoomIn: {
//       animation: 'x 1s',
//       animationName: Radium.keyframes(zoomIn, 'zoomIn')
//     }
//   }

//   const [status, setStatus] = useState("Proc_proc")

//   const [showAddProc, setshowAddProc] = useState(false)

//   const [procs, setProcs] = useState([ ])

//   const [currproc, setcurrProc] = useState([ ])


//   //add procurement
//   const addProc = (proc) => {
//     const id = Math.floor(Math.random()*10000)+1
//     const newProc = {id, ...proc}
//     setProcs([...procs, newProc])
//   }


//   //redirect
//   const changeStatusToItem = (proc) => {
//     // console.log(proc.id)
//     setcurrProc(proc)

//     setStatus("Proc_item")
//   }


//   //toggle avail
//   const toggleAvail = (id) =>{
//     setProcs(procs.map((proc) => proc.id === id ? {...proc, available: !proc.available} : proc))
//   }

//   //change status
//   const changeStatus = () => {
//     setStatus("Home")
//   }

//   const checkStatus = (status) => {
  
//     if(status === "Proc_proc") {
//       return (
//           <div class="container1">
//               <div className="child_container">
//               <StyleRoot><div style ={style1.zoomIn}>
//                   <Header title="Manage Procurements here !" 
//                       onAdd={() => setshowAddProc(!showAddProc)} 
//                       showAdd={showAddProc} 
//                       onchangeStatus={changeStatus}/>
//                   {showAddProc ? <AddProc onAdd={addProc} /> : 
//                       <EmptyPage text="You can use this page to manage your procurements and stay stocked up. Manage you procurements and track their status too!" 
//                         pic="/checklist.jpg" 
//                         area={1} /> }
//               </div>
//               </StyleRoot>
//               </div>

//               <div className="child_container">
//               <StyleRoot><div style ={style1.zoomIn}>
//                   {procs.length > 0 ? <Procs procs={procs} 
//                                              onStatusToItem={changeStatusToItem} 
//                                              onAvail={toggleAvail}/> : 
//                       <EmptyPage text="Nothing on the list right now." 
//                         pic="/document.jpg" 
//                         area={2} /> }
//               </div>

//               </StyleRoot>
//               </div>
//           </div>
//       )
//     }

//     if(status === "Home") {
//       return <Home />
//     }


//     if(status === "Proc_item") {
//         return <Proc_item  currproc={currproc} />
//     }
//   }

//   return checkStatus(status)  
// }

// export default Proc_proc


//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy


//Procs

// import { FaTimes } from 'react-icons/fa'
// import { useState } from 'react'

// const Proc = ({proc, onStatusToItem, onAvail}) => {

//     return (
        
//         <div className = {`task ${proc.available ? 'reminder' : ''}`} onDoubleClick={() => onAvail(proc.id)}>
//             <h3>{proc.id} <button className="btn2" onClick={() => onStatusToItem(proc)} >Manage Items</button></h3>
//             <p>Date: {proc.date}</p>
//         </div>
//     )
// }

// export default Proc

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy


// Proc_Home

// import { Component } from 'react';
// import { useState } from 'react'
// import Proc_item from './Proc_item'
// import Proc_proc from './Proc_proc'
// import { slideInLeft } from 'react-animations';
// import { slideInRight } from 'react-animations';
// import { slideInUp } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';

// const Proc_Home = () => {

//     const style1 = {
//         slideInLeft: {
//           animation: 'x 2s',
//           animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
//         }
//       }
//       const style2 = {
//         slideInRight: {
//           animation: 'x 2s',
//           animationName: Radium.keyframes(slideInRight, 'slideInRight')
//         }
//       }
//       const style3 = {
//         slideInUp: {
//           animation: 'x 1s',
//           animationName: Radium.keyframes(slideInUp, 'slideInUp')
//         }
//       }

//     const [status, setStatus] = useState("Home")

//     const changeStatusToDemand = (status) => {
//         setStatus("Proc_demand");
//       }

//     const changeStatusToproc = (status) => {
//         setStatus("Proc_proc");
//       }

//     const changeStatusTosales = (status) => {
//         setStatus("Proc_sales");
//       }

//     const changeStatusToinven = (status) => {
//         setStatus("Proc_inven");
//       }
    
//     const checkStatus = (status) => {

//         if(status === "Home") {
//             return (
//                 <div className="container">
//                     <div className="child_container">
//                     <StyleRoot><div style ={style3.slideInUp}>
//                         <header className="header"> 
//                             <h1>Welcome to Smart Shop !</h1>
//                         </header>
//                         <div className="style3">
//                             <h5>Welcome manager ! You can use this portal to manage your goods and supplies. Also, you can see visual representations of your sales and demands.</h5>
//                             <img className="img2" src="/groceries.png" />
//                         </div>
//                     </div>
//                     </StyleRoot>
//                     </div> 
//                     <div className="child_container">
//                     <StyleRoot><div style ={style2.slideInRight}>
//                         <button className="btn1" onClick={changeStatusToproc} >Manage Procurement</button>
//                         <button className="btn1" onClick={changeStatusToDemand} >View Analytics</button>
//                         <button className="btn1" onClick={changeStatusTosales} >View Sales </button>
//                         <button className="btn1" onClick={changeStatusToinven} >View Inventory</button>
//                     </div>
//                     </StyleRoot>
//                     </div>
//                 </div>
//             )
//         }

//         if(status === "Proc_proc") {
//             return <Proc_proc />
//         }
//     }

//     return checkStatus(status)
// }

// export default Proc_Home

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

//Proc_item

// import { Component } from 'react';
// import { useState } from 'react'
// import Header from './Header'
// import Tasks from './Tasks'
// import AddTask from './AddTask'
// import EmptyPage from './EmptyPage';
// import Proc_proc from './Proc_proc';
// import { fadeIn } from 'react-animations';
// import { zoomIn } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';

// const Proc_item = ({ currproc }) => {

//   const style1 = {
//     fadeIn: {
//       animation: 'x 1s',
//       animationName: Radium.keyframes(fadeIn, 'fadeIn')
//     }
//   }

//   const style2 = {
//     zoomIn: {
//       animation: 'x 1s',
//       animationName: Radium.keyframes(zoomIn, 'zoomIn')
//     }
//   }

//   const [status, setStatus] = useState("Proc_item")

//   const [showAddTask, setshowAddTask] = useState(false)

//   const [tasks, setTasks] = useState([ ])

//   //add product
//   const addTask = (task) => {
//     const id = Math.floor(Math.random()*10000)+1
//     const newTask = {id, ...task}
//     setTasks([...tasks, newTask])
//   }

//   //remove product
//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id))
//   }

//   //toggle price
//   const togglePrice = (id) =>{
//     setTasks(tasks.map((task) => task.id === id ? {...task, available: !task.available} : task))
//   }

//   //change status
//   const changeStatus = (status) => {
//     setStatus("Proc_proc");
//   }

//   const checkStatus = (status) => {
  
//     if(status === "Proc_item") {
//       return (
//           <div class="container1">
//               <div className="child_container">
//               <StyleRoot><div style ={style2.zoomIn}>
//                   <Header title="Manage your products here !" 
//                       onAdd={() => setshowAddTask(!showAddTask)} 
//                       showAdd={showAddTask} 
//                       onchangeStatus={changeStatus}/>
//                   {showAddTask ? <AddTask onAdd={addTask} /> : 
//                       <EmptyPage text="Welcome to Smart Shop. You can use this portal to manage your goods and supplies efficiently. Simply click the button above." 
//                         pic="/groceries.png" 
//                         area={1} /> }
//               </div>
//               </StyleRoot>
//               </div>
//               <div className="child_container">
//               <StyleRoot><div style ={style2.zoomIn}>
//                 <div className="style4" >
//                   <h3>Adding items for procurement number {currproc.id}</h3>
//                 </div>
//                   {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={togglePrice}/> : 
//                       <EmptyPage text="There are no products entered currently." 
//                         pic="/empty.jpg" 
//                         area={2} /> }
//               </div>
//               </StyleRoot>
//               </div>
//           </div>
//       )
//     }

//     if(status === "Proc_proc") {
//       return <Proc_proc />
//     }
//   }

// return checkStatus(status)
// }

// export default Proc_item



//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

//Proc_proc

// import { Component } from 'react';
// import { useState } from 'react'
// import Header from './Header'
// import Proc from './Proc';
// import EmptyPage from './EmptyPage';
// import Home from './Proc_Home';
// import Proc_item from './Proc_item';
// import { zoomIn } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';
// import {db} from '../firebase/firebase';
// import React, {useEffect } from 'react';
// const Proc_proc = () => {

//   const style1 = {
//     zoomIn: {
//       animation: 'x 1s',
//       animationName: Radium.keyframes(zoomIn, 'zoomIn')
//     }
//   }
    
//   var [date, setDate] = useState("")
    
//   const [status, setStatus] = useState("Proc_proc")

//   const [showAddProc, setshowAddProc] = useState(false)

//   const [procs, setProcs] = useState([])

//   const [currproc, setcurrProc] = useState([ ])

//   //redirect
//   const changeStatusToItem = (proc) => {
//     // console.log(proc.id)
//     setcurrProc(proc)
//     setStatus("Proc_item")
//   }

//   //toggle avail
//   const toggleAvail = (id) =>{
//     setProcs(procs.map((proc) => proc.id === id ? {...proc, available: !proc.available} : proc))
//   }

//   //change status
//   const changeStatus = () => {
//     setStatus("Home")
//   }
//   const changeAdd = () => {
//     setStatus("Add");
//   }

//   const onChangeDate = (e) => {
//     e.preventDefault();
//     date = String(e.target.value);
//     console.log(date);
//   }

//   useEffect(async() => {
//     const citiesRef = db.collection('Branch Procurement');
//     const snapshot = await citiesRef.get();
//     if(status === "Proc_proc")
//     {
//       snapshot.forEach(doc => {
//         var data = {
//           ProcId: doc.data().ProcId, 
//           Date: doc.data().Date
//         };
  
        
//         console.log(data);
  
//         procs.push(data);
//         console.log(procs);
        
  
//       });
//       setStatus("Loaded");
//    }    
//  });

//   const save = async(e) => {
//     e.preventDefault();
//     var cntr = 0;
//     const citiesRef = db.collection('Branch Procurement');
//     const snapshot = await citiesRef.get();
//     snapshot.forEach(doc => {
//       cntr++;
//     });
//     var data = {
//       ProcId: cntr+1, 
//       Date: date
//     };
//     const res = await db.collection('Branch Procurement').add(data);
//     procs.push(data);
//     setStatus("Added");
//   }


//   const checkStatus = (status) => {
  
//     if(status === "Proc_proc") {
//       return (
//           <div class="container1">
//               <div className="child_container">
//               <StyleRoot><div style ={style1.zoomIn}>
                  
//             <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
//             <div className="form-control form">
//                 <label>Date</label>
//                 <input type="date"  required />
//             </div>
//             <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
//         </form>
//               </div>
//               </StyleRoot>
//               </div>
//           </div>
//       )
//     }
//    if(status === "Loaded")
//    {
//       return <div class="container1">
//       <div className="child_container">
//       <StyleRoot><div style ={style1.zoomIn}>
          
//       <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
//     <div className="form-control form">
//         <label>Date</label>
//         <input type="date"  required
//         />
//     </div>
    
//     <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
// </form>
//       </div>
//       </StyleRoot>
//       </div>
//       <div className="child_container">
//       <StyleRoot><div style ={style1.zoomIn}>
//       <div class="FixedHeightContainer">
//     <div class="Content">
//         {
//             procs.map((proc) => (
//             <Proc key={proc.ProcId} proc={proc} 
//             onStatusToItem={changeStatusToItem} 
//             onAvail={toggleAvail}/>
//         ))}  
//     </div>
// </div>
//       </div>
//       </StyleRoot>
//       </div>
//   </div>
//    }
//    if(status === "Added")
//    {
//     return <div class="container1">
//     <div className="child_container">
//     <StyleRoot><div style ={style1.zoomIn}>
        
//     <form className="control-proc" onChange = {(e) => {onChangeDate(e)}} >
//   <div className="form-control form">
//       <label>Date</label>
//       <input type="date"  required
//       />
//   </div>

//   <input className="bt btn-block" type="submit" value="Save" onClick = {(e)=>{save(e)}}/>
// </form>
//     </div>
//     </StyleRoot>
//     </div>
//     <div className="child_container">
//     <StyleRoot><div style ={style1.zoomIn}>
//     <div className="FixedHeightContainer">
//   <div className="Content">
//       {
//           procs.map((proc) => (
//           <Proc key={proc.ProcId} proc={proc} 
//           onStatusToItem={changeStatusToItem} 
//           onAvail={toggleAvail}/>
//       ))}  
//   </div>
// </div>
//     </div>
//     </StyleRoot>
//     </div>
// </div>
//    }

//     if(status === "Home") {
//       return <Home />
//     }

//     if(status === "Proc_item") {
//         return <Proc_item  currproc={currproc} />
//     }
//   }
//   return checkStatus(status)  
// }

// export default Proc_proc


//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

//Proc

// import { FaTimes } from 'react-icons/fa'

// import { useState } from 'react'

// const Proc = ({proc, onStatusToItem, onAvail}) => {

//     return (
        
//         <div className = {`task ${proc.available ? 'reminder' : ''}`} onDoubleClick={() => onAvail(proc.id)}>
//             <h3>{proc.ProcId} <button className="btn2" onClick={() => onStatusToItem(proc)} >Manage Items</button></h3>
//             <p>Date: {proc.Date}</p>
//         </div>
//     )
// }

// export default Proc


//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//yrsxrjjjjjjjjjjjjjjjjjjjjjjddddddddddddddddddddddddddyhkmmmrdrtdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
//uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiii
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

//Task

// import { FaTimes } from 'react-icons/fa'

// const Task = ({task, onDelete, onToggle}) => {
//     return (
//         <div className = {`task ${task.available ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
//             <h3>{task.text} <FaTimes style ={{color: "red",
//         cursor: "pointer"}} onClick= {() => onDelete(task.id)} /></h3>
//             <p>Stock: {task.stock}</p>
//             <p>Price: {task.price}</p>
//         </div>
//     )
// }

// export default Task
