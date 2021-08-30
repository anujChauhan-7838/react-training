import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import FormErrors from './FormErrors';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

class Otpverify extends Component{
    
    constructor(){
        super();
        this.state = {
            "opt":"",
            "formErrors": {'otp': '','gError':''},
            "otpValid": false,
            "showVBtn":true
            
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDefault();
        this.validateField('otp',this.state.otp);
        this.state.showVBtn = false;
        axios({
          method:"post",
          url:"https://mighty-refuge-98472.herokuapp.com/auth/verify-otp",
          data:{otp:this.state.otp}
        }).then((response)=>{
              console.log('Register api -----')
              console.log(response.data);
              if(response.data.status == 1){
                   this.props.history.push('/signin');
              }else{
                this.setState({formErrors:{...this.state.formErrors,gError:response.data.message}});
              }
              this.setState({showVBtn:true});
              
        }).catch((error)=>{
            console.log('Cake list is not loaded'+error);
            this.setState({showVBtn:true});
            this.setState({formErrors:{...this.state.formErrors,gError:error}});
           
            
        });
        
    }

    handleUserInput  = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(
            {[name]: value}, 
            () => { this.validateField(name, value) });
      }

      validateField = (fieldName, value) =>{
        let fieldValidationErrors = this.state.formErrors;
        let otpValid = this.state.otpValid;
        switch(fieldName) {
            
          case 'otp':
            otpValid = value != '';
            fieldValidationErrors.otp = otpValid ? '' : ' is invalid';
            break;
          
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        otpValid: otpValid
                      }, this.validateForm);
      }
      
      validateForm = () =>{
        this.setState({formValid: this.state.otpValid});
      }

      errorClass = (error) =>{
        return(error.length === 0 ? '' : 'has-error');
     }

    render(){
        var regBtn = <span>Verify Now</span>;
      if(!this.state.showVBtn){
       regBtn =  <span><Spinner animation="border" variant="primary" /></span>
      }
        return (
          <div className="container">
              <div className="panel panel-default">
                   <FormErrors formErrors={this.state.formErrors} />
            </div>
          <div className="signup-form">
          <form onSubmit={(event)=>this.checkFormAndSubmit(event)} method="post">
          <h2>Verify One Time Password</h2>
          
        <div className="form-group">
                <input type="text" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="otp" placeholder="One Time Password" required="required" autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px"}} />
        </div>
          
        <div className="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block" disabled={!this.state.formValid}>{regBtn}</button>
        </div>
        </form>
        
      </div>                    
      </div>   
        );
    }
}

export default Otpverify; 