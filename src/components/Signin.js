import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import FormErrors from './FormErrors';

class Signin extends Component{
    
    constructor(){
        super();
        this.state = {
            "username":"",
            "password":"",
            "formErrors": {'username': '', 'password': ''},
            "usernameValid": false,
            "passwordValid": false,
            "formValid": false
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDeafult();
        this.validateField('username',this.state.username);
        this.validateField('password',this.state.password);
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
        let passwordValid = this.state.passwordValid;
       
      
        switch(fieldName) {
            
          case 'username':
            usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        usernameValid: usernameValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }
      
      validateForm = () =>{
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
      }

      errorClass = (error) =>{
        return(error.length === 0 ? '' : 'has-error');
     }

    render(){
        return (
          <div className="container">
              <div className="panel panel-default">
                   <FormErrors formErrors={this.state.formErrors} />
            </div>
          <div className="signup-form">
          <form onSubmit={(event)=>this.checkFormAndSubmit(event)} method="post">
          <h2>Login</h2>
          
        <div className="form-group">
                <input type="email" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="username" placeholder="Email" required="required" autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px"}} />
        </div>
        <div className="form-group">
                  <input type="password" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="password" placeholder="Password" required="required" autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px", "cursor": "pointer"}} />
        </div>
          
        <div className="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block" disabled={!this.state.formValid}>Login Now</button>
        </div>
        </form>
        <div class="text-center">Already have an account? <Link to="/signup"> Sign Up</Link></div>
        <div class="text-center">I have forgot my password? <Link to="/forgot"> Forgot</Link></div>
      </div>                    
      </div>   
        );
    }
}

export default Signin; 