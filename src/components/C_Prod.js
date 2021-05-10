import { FaCartPlus, FaPlusCircle, FaTimes } from 'react-icons/fa'
import { FaHome, FaCheck } from 'react-icons/fa'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaInfoCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
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
import Task from './Excluded_files/Task';
import React, { useEffect } from 'react';
import C_Home from './C_Home'
import Cart from './Cart';
const C_Prod = ({ uid }) => {
//RazorPay key id: rzp_test_myGwLTueUSTDxn
//Razorpay key secret: 7mxu3Ebi0E5KBcN10ikhb60c
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
    
    const [status, setStatus] = useState("C_Prod")
    const [items, setItems] = useState([])
    const [searchedItems, setSearchedItems] = useState([])
    var [price, setPrice] = useState();
    var [product, setProduct] = useState();
    var [quantity, setQuantity] = useState(0);
    var [code, setCode] = useState(0)
    var [search, setSearch] = useState("");
    
    const onChangeQuantity = (e) => {
        e.preventDefault();
        quantity = parseInt(e.target.value);
        console.log(quantity);
    }

    const onChangeSearch = (e) => {
        e.preventDefault();
        search = String(e.target.value);
        console.log(search);
    }

    const onChangeToLoadingPage = () => {
        setStatus("Loaded");
    }

    useEffect(async() => {
        console.log(status);
        const citiesRef = db.collection('branch item master');
        const snapshot = await citiesRef.get();
        if(status === "C_Prod")
        {
            console.log(status);
            snapshot.forEach(doc => {
            var data = {
              item_code: doc.data().item_code, 
              quantity_remaining: doc.data().quantity_remaining,
              product: doc.data().product,
              price: doc.data().price
            };
       
            console.log(data);
            items.push(data);
            console.log(items);  
      
          });
          console.log(status);
          setStatus("Loaded");
       }  
         
    });

    const onSearch = async() => {

        if(searchedItems.length > 0)
        {
            for (var i = 0; i < searchedItems.length; i++) 
            {
                searchedItems.splice(i, 1);
                i--;
            }
        }

        search = search.toLowerCase();
        var bit = 0;

        const productsRef = db.collection('branch item master');
        const snapshot = await productsRef.get();

        snapshot.forEach(doc => 
        {
            var data = {
                item_code: doc.data().item_code, 
                quantity_received: doc.data().quantity_received,
                quantity_remaining: doc.data().quantity_remaining,
                product: doc.data().product,
                price: doc.data().price
            }

            if(data.product.toLowerCase().includes(search) ||search.includes(data.product.toLowerCase()))
            {
                searchedItems.push(data);
                console.log(searchedItems);

                if(status === "Loaded" || status === "searchedAgain")
                    setStatus("Searched");

                else
                {
                    setStatus("searchedAgain");
                }
            }

            else{
                bit = 1;
            }
        });

        if(bit === 1 && searchedItems.length === 0)
        {
            alert("No such product available");
        }
        
    }

    const save = async(item) => {

        const productsRef = db.collection('Cart');
        const snapshot = await productsRef.get();
        var flag = 0;

        snapshot.forEach(doc => 
        {
            var data = {
                item_code: doc.data().item_code, 
                quantity: doc.data().quantity,
                product: doc.data().product,
                price: doc.data().price,
                customer_id: doc.data().customer_id
            }

            if(uid === data.customer_id && item.item_code === data.item_code)
            {
                if(quantity > 0 && quantity < item.quantity_remaining+1)
                {
                    var data_new = {
                        item_code: data.item_code, 
                        product: data.product,
                        price: data.price,
                        quantity: data.quantity + quantity,
                        customer_id: data.customer_id
                    }
                    
                    const res = db.collection('Cart').doc(doc.id).set(data_new);
                }

                else{
                    alert("Quantity not valid or product out of stock !");
                }
                flag = 1;
            }
        });

        if(flag === 0)
        {
            if(quantity > 0 && quantity < item.quantity_remaining+1)
            {
                var data_new = {
                    item_code: item.item_code, 
                    product: item.product,
                    price: item.price,
                    quantity: quantity,
                    customer_id: String(uid)
                };
        
                const res = db.collection('Cart').add(data_new);
                console.log(data_new);
            }
            else{
                alert("Quantity not valid or product out of stock !");
            }
        }  
    } 

    const onchangeStatus = (status) => {
        setStatus("C_Home");
    }
    const changeToCart = (e) => {
        e.preventDefault();
        setStatus("cart");
    }

    const checkStatus = (status) => {

        if(status === "C_Home")
        {
            return <C_Home />
        }
    
        if(status === "C_Prod")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home"><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search Products" />
                        <FaSearch style ={{color: "grey",cursor: "pointer"}} />
                    </div>   

                    <div class="FixedHeightContainer_empty">
                    <EmptyPage text="Loading..." />
                    </div>

                </div>
            )
        }

        if(status === "Loaded")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus} ><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search Products"
                            onChange={(e) => onChangeSearch(e)} />
                        <FaSearch style ={{color: "grey",cursor: "pointer"}} 
                        onClick= {() => onSearch()} />
                    </div>   

                    <input class="addtocart1" type="submit" 
                    value="Go to Cart" onClick = {(e) => {changeToCart(e)}}/>
                   
                    <div class="FixedHeightContainer_prod">
                        <div class="Content_prod">
                        {
                            items.map((item) => (
                            <div>
                                <div className = "prod" >
                                <div className="header_prod1">
                                    <p>{item.product} </p>
                                    <p>Rs.{item.price}</p>
                                    <div className="alignment">
                                        <input className="quan" 
                                        type="number" 
                                        onChange={(e) => onChangeQuantity(e)} />
                                    </div>
                                </div>
                                <input class="addtocart" type="submit" 
                                value="ADD TO CART" onClick={() => save(item)} />
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )
        }

        if(status === "Searched")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus} ><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search Products"
                            onChange={(e) => onChangeSearch(e)} />
                        <FaSearch style ={{color: "grey",cursor: "pointer"}} 
                        onClick= {() => onSearch()} />
                    </div>   

                    <input class="addtocart1" type="submit" 
                    value="Go to Cart"  onClick = {(e) => {changeToCart(e)}}/>

                    <input class="addtocart2" type="submit" 
                    value="See all Products" onClick={onChangeToLoadingPage}/>

                    <div class="FixedHeightContainer_prod">
                        <div class="Content_prod">
                        {
                            searchedItems.map((item) => (
                            <div>
                                <div className = "prod" >
                                <div className="header_prod1">
                                    <p>{item.product} </p>
                                    <p>Rs.{item.price}</p>
                                    <div className="alignment">
                                        <input className="quan" 
                                        type="number" 
                                        onChange={(e) => onChangeQuantity(e)} />
                                    </div>
                                </div>
                                <input class="addtocart" type="submit" 
                                value="ADD TO CART" onClick={() => save(item)} />
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )
        }

        if(status === "searchedAgain")
        {
            return (
                <div className="container_prod">
                    <div className="header_prod">
                        <p class="logo">Smart Shop</p>
                        <div className="header-right">
                            <a href="#home" onClick={onchangeStatus} ><FaHome style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#contact"><FaPhoneSquareAlt style ={{color: "white",cursor: "pointer"}} /></a>
                            <a href="#about"><FaInfoCircle style ={{color: "white",cursor: "pointer"}} /></a>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search Products"
                            onChange={(e) => onChangeSearch(e)} />
                        <FaSearch style ={{color: "grey",cursor: "pointer"}} 
                        onClick= {() => onSearch()} />
                    </div>   

                    <input class="addtocart1" type="submit" 
                    value="Go to Cart" onClick = {(e) => {changeToCart(e)}} />

                    <input class="addtocart2" type="submit" 
                    value="See all Products" onClick={onChangeToLoadingPage}/>

                    <div class="FixedHeightContainer_prod">
                        <div class="Content_prod">
                        {
                            searchedItems.map((item) => (
                            <div>
                                <div className = "prod" >
                                <div className="header_prod1">
                                    <p>{item.product} </p>
                                    <p>Rs.{item.price}</p>
                                    <div className="alignment">
                                        <input className="quan" 
                                        type="number" 
                                        onChange={(e) => onChangeQuantity(e)} />
                                    </div>
                                </div>
                                <input class="addtocart" type="submit" 
                                value="ADD TO CART" onClick={() => save(item)} />
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )
        }
        if(status === "cart")
        {
            return <Cart uid = {uid}/>
        }
    }

    return checkStatus(status)  
}

export default C_Prod
