import { CardElement ,CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js";
import './payment.css';

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

export default function CardSection() {
    return (
        <div >
        <label>
          Card Number
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
        
        </div>
      );
}