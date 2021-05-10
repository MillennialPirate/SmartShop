import { Component } from 'react';
import { useState } from 'react'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import C_Prod from './C_Prod';
import Shop from './Shop'
import Radium, {StyleRoot} from 'radium';
import { FaHome, FaCheck } from 'react-icons/fa'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import C_Trend from './C_Trend'

const C_Home = ({ uid }) => {

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

    const changeStatusToProd = (status) => {
      console.log("-----------------");
      console.log(String(uid));
      setStatus("Prod");
    }

    const changeStatusToRec = (status) => {
      setStatus("Rec");
    }

    const onchangeStatus = (status) => {
      setStatus("Shop");
    }

    const checkStatus = (status) => {

      if(status === "Rec")
      {
        return <C_Trend />
      }

      if(status === "Home") {
          return (
              <div className="container">
                <div className="header_prod2">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus}><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                  <div className="child_container">
                  <StyleRoot><div style ={style3.slideInUp}>
                      <header className="header"> 
                          <h1>Welcome to Smart Shop !</h1>
                      </header>
                      <div className="style3">
                          <h5>Welcome Customer ! This portal connects you to your nearest supermarket so that you can meet your daily needs without having to step out. Happy Shopping ! </h5>
                          <img className="img2" src="/groceries.png" />
                          <p className="link"><a href="#" onClick={onchangeStatus}>Go Back</a></p>
                      </div>
                  </div>
                  </StyleRoot>
                  </div> 
                  <div className="child_container">
                  <StyleRoot><div style ={style2.slideInRight}>
                      <button className="btn1" onClick={changeStatusToProd} >Proceed to Shop</button>
                      <button className="btn1" onClick={changeStatusToRec} >Products you may like</button>
                  </div>
                  </StyleRoot>
                  </div>
              </div>
          )
      }

      if(status === "Prod"){
        console.log(String(uid));
        return <C_Prod uid={uid} />
      }

      if(status === "Shop") {
        return <Shop />
      }
    }

  return checkStatus(status)
}

export default C_Home
