import { React, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

import swal from 'sweetalert';
const RazorPanel = ({ price, items, uid }) => {
  
  const [amount, setAmount] = useState(price);


  const addToSales = async() => {

    const citiesRef = db.collection('Item sales');
    const snapshot = await citiesRef.get();

    var isAlreadyPresent = 0;

    snapshot.forEach(doc => {

      var data = {
        item_code: doc.data().item_code,
        product: doc.data().product,
        quantity: doc.data().quantity,
        revenue: doc.data().revenue
      }

      items.map(async (item) => {
        if (item.item_code === data.item_code) {
          var data_new = {
            item_code: item.item_code,
            product: item.product,
            quantity: parseInt(item.quantity + data.quantity),
            revenue: parseInt(item.price + data.revenue)
          }
          console.log(data_new);
          const res = await db.collection('Item sales').doc(String(data_new.item_code)).set(data_new).catch(err => console.log(err));
          isAlreadyPresent = 1;
        }
      });

    });

    if(isAlreadyPresent === 0)
    {
      items.map(async(item) => {
        var data_new = {
          item_code: item.item_code,
          product: item.product,
          quantity: item.quantity,
          revenue: item.price
        }
        const res = await db.collection('Item sales').doc(String(data_new.item_code)).set(data_new).catch(err => console.log(err));
      });
    }
  }

  const openCheckout = () => {
    let options = {
      "key": "API_KEY",
      "amount": price, // 2000 paise = INR 20, amount in paisa
      "name": "Smart shop",
      "description": "Purchase Description",
      "image": "https://cdn.razorpay.com/logos/H7uqY0rDp7E5mn_medium.png",
      "handler": function (response) {
        swal({
          title: "Good job!",
          text: "Payment successful, please refresh the page!",
          icon: "success",
          button: "Proceed!",
        });
        //add to billing master 
        items.map(async (item) => {
          var data = {
            customer_id: uid,
            item_code: item.item_code,
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            sales_id: response.razorpay_payment_id
          };
          const ref = db.collection('branch item master').doc(String(item.item_code));
          const document = await ref.get();
          console.log(document.data().quantity_received);
          var data1 = {
            item_code: item.item_code,
            price: item.price,
            product: item.product,
            quantity_received: document.data().quantity_received,
            quantity_remaining: document.data().quantity_remaining - item.quantity
          };
          console.log(data);
          console.log(data1 );

          console.log(item.doc_id);
          const ref1 = db.collection('billing master').doc();
          const res = ref1.set(data);
          const res1 = await db.collection('Cart').doc(String(item.doc_id)).delete();
          const res2 = await db.collection('branch item master').doc(String(item.item_code)).set(data1);
        })
        addToSales(items);
      },
      "prefill": {
        "name": "",
        "email": ""
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#47A8BD"
      }
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  }
  return <div>

    <button class="btn transparent" style={{ background: "#6CB4EE" }} id="rzp-button1" onClick={() => openCheckout()}>
      Pay
      </button>
  </div>

}
export default RazorPanel;
