import { ElementsConsumer, CardElement,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js";
import React from "react";
import CardSection from './paymentCartSection'
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";
import axios from 'axios';
import { Redirect } from "react-router";

class CheckoutForm extends React.Component {

    constructor(props){
        super();
        
        this.state = {
            "isGeneratingToken":false,
            "isPaymentDone":false
            
        }
    }
  handleSubmit = async event => {
    event.preventDefault();
     this.setState({isGeneratingToken:true});
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card);
    if (result.error) {
        this.setState({isGeneratingToken:false});
        toast.error(result.error.message);
        
    } else {
      console.log(result.token);
      axios({
        method:"post",
        url:process.env.REACT_APP_BASEURL+"/auth/do-payment",
        data:{token:result.token.id,orderId:this.props.orderId}
      }).then((response)=>{
           
           if(response.data.status == 1){
            toast.success(response.data.message);
            this.setState({isPaymentDone:true});
           }else{
            toast.error(response.data.message);
           }
           this.setState({isGeneratingToken:false});
            
      }).catch((error)=>{
        toast.error(error);
        this.setState({isGeneratingToken:false});
      });


    }
  };

  render() {
    if(this.state.isPaymentDone){
      return <Redirect to="/my-orders" />
    }
    var paybtn = <button className="btn-pay">Buy Now</button>
    if(this.state.isGeneratingToken){
        paybtn =  <button className="btn-pay" disabled> <Spinner animation="border" variant="primary" /></button>
    }
    return (
      <div>
        <div className="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          {paybtn}
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm(props) {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm stripe={stripe} elements={elements} orderId={props.orderId} />
        )}
      </ElementsConsumer>
    );
  }