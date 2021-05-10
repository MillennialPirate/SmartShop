import { Component, createRef } from 'react';
import { useState } from 'react'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {db} from '../firebase/firebase';
import {auth} from '../firebase/firebase';
import Shop from './Shop';
import photo from './logo.png';
import Signin from './signin';
import Proc_Home from './Proc_Home'
import B_Home from './B_Home'
import C_Home from './C_Home'

import './signup.css';

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
const Signup = ( { flag } ) => {

    const [status, setStatus] = useState("signup")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");
    var user_id = "";

    const changeStatusToSignup = (status) => {
        setStatus("signup");
      }
      const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        console.log(email);
      }
      const onChangePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        console.log(password);
      }
      const createAccount = (e) => {
          e.preventDefault();
          auth.createUserWithEmailAndPassword(email, password)
            .then(async(user) => {
              
                setUid(user.user.uid);
                user_id = user.user.uid;

                if(String(flag) === "A")
                {
                  const res = await db.collection('admin').doc(user_id).set({});
                  setStatus("admin page");
                }
                if(String(flag) === "B")
                {
                  const res = await db.collection('branch manager').doc(user_id).set({});
                  setStatus("branch page");
                }
                if(String(flag) === "C")
                {
                  const res = await db.collection('customer').doc(user_id).set({});
                  setStatus("customer page");
                }
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        window.alert("Email is already in use!");
                        break;
                    case "auth/invalid-email":
                        window.alert("Try again : " + error.message);
                        break;
                    case "auth/weak-password":
                        window.alert("Weak password");
                        break;
                    default: console.log("Hello");
                }
            });
      }


      const checkStatus = (status) => {

        if(status === "signup") {
            return (
                <div className="total">
                <StyleRoot><div style={style1.slideInLeft}><div style={{ paddingLeft:"15%",paddingRight: "5%", }}><h1 style={{ color: "black", fontSize: "3.5rem" }}>Welcome to SmartShop!</h1></div></div></StyleRoot>
                
                    <StyleRoot><div className="app" style={style3.slideInUp}>
                        <div className="bg"></div>
    
                        <form >
                            <header>
                            <StyleRoot><img src = {photo} style={style2.slideInRight}/></StyleRoot>
                            </header>
    
                            <div className="inputs">
                                <input type="text" name="email" placeholder="email" onChange={(e) => {onChangeEmail(e)}} />
                                <input type="password" name="password" placeholder="password" onChange={(e) => {onChangePassword(e)}} />
                            </div>
    
                        </form>
    
                        <footer>
                            <button onClick = {(e) => {createAccount(e)}}>Create</button>
                            <p>Already have an account? <a href="#" onClick = {(e) => {e.preventDefault(); setStatus("signin")}} >Sign in</a></p>
                        </footer>
    
    
                    </div>
                    </StyleRoot>
            </div>
            )
        }

        if(status === "signin")
        {
          return <Signin/>
        }

        if(status === "admin page")
        {
          return <Proc_Home uid={uid} />
        }

        if(status === "branch page")
        {
          return <B_Home  uid={uid} />
        }

        if(status === "customer page")
        {
          return <C_Home  uid={uid} />
        }
    }

    return checkStatus(status)
}

export default Signup
