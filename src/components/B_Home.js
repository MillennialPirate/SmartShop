import { Component } from 'react'
import { useState } from 'react'
import B_Supp from './B_Supp'
import B_inven from './B_inven'
import Shop from './Shop'
import { slideInLeft } from 'react-animations'
import { slideInRight } from 'react-animations'
import { slideInUp } from 'react-animations'
import Radium, {StyleRoot} from 'radium'

const B_Home = ({ uid }) => {

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

    const changeStatusToAdd = (status) => {
        setStatus("B_Supp");
    }

    const changeStatusToinven = (status) => {
        setStatus("B_inven");
    }

    const onchangeStatus = (status) => {
        setStatus("Shop");
      }
    
    const checkStatus = (status) => {

        if(status === "Home") {
            return (
                <div className="container">
                    <div className="child_container">
                        <StyleRoot><div style ={style3.slideInUp}>
                            <header className="header"> 
                               <h1>Welcome to Smart Shop !</h1>
                            </header>
                            <div className="style3">
                                <h5>Welcome manager ! You can use this portal to keep your branch stocked up at all times. We help you serve your local customers.</h5>
                                <img className="img1" src="/groceries.png" />
                                <p className="link"><a href="#" onClick={onchangeStatus}>Go Back</a></p>
                            </div>
                        </div>
                        </StyleRoot>
                    </div> 
                    <div className="child_container">
                        <StyleRoot><div style ={style2.slideInRight}>
                            <button className="btn1" onClick={changeStatusToAdd} >Manage Supplies</button>
                            <button className="btn1" onClick={changeStatusToinven} >Inventory</button>
                        </div>
                        </StyleRoot>
                    </div>
                </div>
            )
        }

        if(status === "B_Supp") {
            return <B_Supp />
        }

        if(status === "B_inven") {
            return <B_inven />
        }

        if(status === "Shop") {
            return <Shop />
        }

    }

    return checkStatus(status)
}

export default B_Home
