import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout";
import { useState } from "react";
import {connect} from 'react-redux';
import './payment.css';
const stripePromise = loadStripe('pk_test_iG1oSSlB6ldswCjjTUdn6tdR00MSAtcydz');
 function payment(props){
   
    return (
        <div className="App">
          <div className="product">
            <img
              src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
              alt="laptop"
              style={{ width: "100%", height: "auto" }}
            />
            <div>
            <Elements stripe={stripePromise}>
            <CheckoutForm  orderId={props.paymentOrderId}/>
          </Elements>
            </div>
          </div>
        </div>
      );
}

export default connect(function(state,props){
  return {
    paymentOrderId:state.paymentOrderId,
  }
})(payment);