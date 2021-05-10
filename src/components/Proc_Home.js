import { Component } from 'react';
import { useState } from 'react'
import Proc_proc from './Proc_proc'
import Proc_inven from './Proc_inven'
import Proc_sales from './Proc_sales'
import Proc_demand from './Proc_demand'
import Shop from './Shop'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const Proc_Home = ({ uid }) => {

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

    const [status, setStatus] = useState("Home")

    const changeStatusToDemand = (status) => {
        setStatus("Proc_demand");
      }

    const changeStatusToproc = (status) => {
        setStatus("Proc_proc");
      }

    const changeStatusTosales = (status) => {
        setStatus("Proc_sales");
      }

    const changeStatusToinven = (status) => {
        setStatus("Proc_inven");
      }

    const onchangeStatus = (status) => {
      setStatus("Shop");
    }
    
    const checkStatus = (status) => {

        if(status === "Proc_inven")
        {
          return <Proc_inven />
        }

        if(status === "Proc_sales")
        {
          return <Proc_sales />
        }

        if(status === "Proc_demand")
        {
          return <Proc_demand />
        }

        if(status === "Home") {
            return (
                <div className="container">
                    <div className="child_container">
                    <StyleRoot><div style ={style3.slideInUp}>
                        <header className="header"> 
                            <h1>Welcome to Smart Shop !</h1>
                        </header>
                        <div className="style3">
                            <h5>Welcome manager ! You can use this portal to manage your goods and supplies. Also, you can see visual representations of your sales and demands.</h5>
                            <img className="img2" src="/groceries.png" />
                            <p className="link"><a href="#" onClick={onchangeStatus}>Go Back</a></p>
                        </div>
                    </div>
                    </StyleRoot>
                    </div> 
                    <div className="child_container">
                    <StyleRoot><div style ={style2.slideInRight}>
                        <button className="btn1" onClick={changeStatusToproc} >Manage Procurement</button>
                        <button className="btn1" onClick={changeStatusToDemand} >View Demand Analytics</button>
                        <button className="btn1" onClick={changeStatusTosales} >View Sales </button>
                        <button className="btn1" onClick={changeStatusToinven} >View Inventory</button>
                    </div>
                    </StyleRoot>
                    </div>
                </div>
            )
        }

        if(status === "Proc_proc") {
            return <Proc_proc />
        }

        
        if(status === "Shop") {
          return <Shop />
      }
    }

    return checkStatus(status)
}

export default Proc_Home