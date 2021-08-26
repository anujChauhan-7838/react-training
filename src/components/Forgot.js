import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import FormErrors from './FormErrors';

class Forgot extends Component{
    
    constructor(){
        super();
        this.state = {
            "username":"",
            "formErrors": {'username': ''},
            "usernameValid": false,
            "formValid": false
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDeafult();
        this.validateField('username',this.state.username);
        
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
        let usernameValid = this.state.usernameValid;
        switch(fieldName) {
            
          case 'username':
            usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        usernameValid: usernameValid,
                      }, this.validateForm);
      }
      
      validateForm = () =>{
        this.setState({formValid: this.state.usernameValid});
      }

      errorClass = (error) =>{
        return(error.length === 0 ? '' : 'has-error');
     }

    render(){
        return (
          <div className="container">
             
          <div className="signup-form">
          <form onSubmit={(event)=>this.checkFormAndSubmit(event)} method="post">
          <h2>Forgot Password</h2>
          <div className="panel panel-default">
                   <FormErrors formErrors={this.state.formErrors} />
            </div>
          
        <div className="form-group">
                <input type="email" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="username" placeholder="Email" required="required" autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px"}} />
        </div>
          
        <div className="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block" disabled={!this.state.formValid}>Send Me Reset Link</button>
        </div>
        </form>
        <div class="text-center">Already have an account? <Link to="/signin"> Sign In</Link></div>
        <div class="text-center">Register new account? <Link to="/signup">Sign Up</Link></div>
      </div>                    
      </div>   
        );
    }
}

export default Forgot; 