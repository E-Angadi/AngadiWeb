import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {PayPalButtons} from '@paypal/react-paypal-js'  // paypal payment package
import { useState } from 'react';
import {useAlert} from "react-alert"  // Package for popup alert
  

function PaypalCheckoutButton(props) {

    const {product} = props;  // destructuring product details passed through props

    const alert = useAlert()

    const [orderID, setOrderID] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    const navigate = useHistory();

    // Checking If Payment is Successful or not

    useEffect(()=>{
      if(success){
        navigate.push('/account#orders')
    }else{
        alert.show(ErrorMessage)
    }
    },[ErrorMessage])

    

  return  <PayPalButtons
  style={{
    color:"silver",
    layout:"horizontal",
    height:48,
    tagline:false,
    shape:"pill"
  }}

  //Creating order and payment

  createOrder={(data,actions)=>{
    return actions.order.create({
        purchase_units:[{
            description:product.description,
            amount:{
                currency_code:"INR",
                value:product.price
            },
        }]
    }).then((orderID)=>{
        setOrderID(orderID);
    })
  }}

  //fuction to know wheather the order is successful or not

  onApprove={(data,actions)=>{
   return actions.order.capture().then(function(details){
    const {payer} = details
    setSuccess(true)
   })
  }}

  //popup alert if there is an error in payment

  onError = {(data, actions)=>{
    setErrorMessage("An Error occured with your payment")
    alert.show(ErrorMessage)
  }}

  />
}

export default PaypalCheckoutButton