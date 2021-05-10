import { Component } from 'react';
import { useState } from 'react'
import B_Home from './B_Home'
import C_Home from './C_Home'
import Proc_Home from './Proc_Home'
import Signin from './signin'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const Shop = () => {

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

    const [status, setStatus] = useState("Shop")
    const [flag, setFlag] = useState("");

    const changeStatusToAdmin = (status) => {
        setFlag("A");
        setStatus("Admin");
    }

    const changeStatusToBranch = (status) => {
        setFlag("B");
        setStatus("Branch");
    }

    const changeStatusToCustomer = (status) => {
        setFlag("C");
        setStatus("Customer");
    }
    
    const checkStatus = (status) => {

        if(status === "Shop") {
            return (
                <div className="container">
                    <div className="child_container">
                        <StyleRoot><div style ={style3.slideInUp}>
                            <header className="header"> 
                               <h1>Welcome to Smart Shop !</h1>
                            </header>
                            <div className="style7">
                                <h3>Welcome user!</h3>
                                <img className="img1" src="/groceries.png" />
                            </div>
                        </div>
                        </StyleRoot>
                    </div> 
                    <div className="child_container">
                        <StyleRoot><div style ={style2.slideInRight}>
                            <button className="btn1" onClick={changeStatusToAdmin} >Signin as Admin</button>
                            <button className="btn1" onClick={changeStatusToBranch} >Signin as Branch Manager</button>
                            <button className="btn1" onClick={changeStatusToCustomer} >Signin as Customer</button>
                        </div>
                        </StyleRoot>
                    </div>
                </div>
            )
        }

        if(status === "Admin" || status === "Branch" || status === "Customer") {
            return <Signin flag={flag} />
        }
    }

    return checkStatus(status)
}

export default Shop
