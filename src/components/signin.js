import { Component } from 'react';
import { useState } from 'react'
import { slideInLeft } from 'react-animations';
import { slideInRight } from 'react-animations';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {auth} from '../firebase/firebase';
import {db} from '../firebase/firebase';
import Shop from './Shop';
import photo from './logo.png';
import Signup from './signup';
import './signup.css';
import Proc_Home from './Proc_Home'
import B_Home from './B_Home'
import C_Home from './C_Home'

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
const Signin = ({flag}) => {

    const [status, setStatus] = useState("signin")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState("");
    var user_id = "";

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

      const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(async(userCredential) => {

              console.log(userCredential.user.uid);
              setUid(userCredential.user.uid);
              user_id = userCredential.user.uid;

              if(String(flag) === "A")
              {
                var bit = 0;
                const citiesRef = db.collection('admin');
                const snapshot = await citiesRef.get();

                snapshot.forEach(doc => {
                  
                  console.log(doc.id);
                  console.log(user_id);

                  if(doc.id === user_id)
                  {
                    setStatus("admin page");
                    bit = 1;
                  }
                });
                
                if(bit === 0)
                {
                  alert("You are not a registered admin !");
                  return;
                }
              }

              //--------------------------------------------------

              if(String(flag) === "B")
              {
                var bit = 0;
                const citiesRef = db.collection('branch manager');
                const snapshot = await citiesRef.get();

                snapshot.forEach(doc => {

                  console.log(doc.id);
                  console.log(user_id);

                  if(doc.id === user_id)
                  {
                    setStatus("branch page");
                    bit = 1;
                  }
                });
                
                if(bit === 0)
                {
                  alert("You are not a registered manager !");
                }
              }

              //---------------------------------------------------- 

              if(String(flag) === "C")
              {
                var bit = 0;
                const citiesRef = db.collection('customer');
                const snapshot = await citiesRef.get();

                snapshot.forEach(doc => {

                  console.log(doc.id);
                  console.log(user_id);

                  if(doc.id === user_id)
                  {
                    setStatus("customer page");
                    bit = 1;
                  }
                });
                
                if(bit === 0)
                {
                  alert("You are not a registered customer !");
                }
              }

            })
            .catch((error) => {
                if (
                    error.code === "auth/invalid-email" ||
                    error.code === "auth/user-not-found"
                  ) {
                    window.alert("Invalid email ID. Please try again");
                  } else if (error.code === "auth/wrong-password") {
                    window.alert("Wrong password");
                  }
                
            });
      }

      const checkStatus = (status) => {

        if(status === "signin") {
            return (
                <div className="total">
                <StyleRoot><div style={style1.slideInLeft}><div style={{ paddingLeft:"15%",paddingRight: "5%", }}><h1 style={{ color: "black", fontSize: "3.5rem" }}>Login to SmartShop!</h1></div></div></StyleRoot>
                
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
                            <button onClick = {(e)=>{login(e)}}>Login</button>
                            <p>Don't have an account? <a href="#" onClick = {(e) => {e.preventDefault(); setStatus("signup")}} >Sign up</a></p>
                        </footer>
    
    
                    </div>
                    </StyleRoot>
            </div>
            )
        }
        if(status === "signup")
        {
          return <Signup flag={flag} />
        }

        if(status === "admin page")
        {
          console.log(uid);
          return <Proc_Home uid={uid} />
        }

        if(status === "branch page")
        {
          return <B_Home  uid={uid} />
        }

        if(status === "customer page")
        {
          console.log(uid);
          return <C_Home  uid={uid} />
        }
    }

  return checkStatus(status)
}

export default Signin
