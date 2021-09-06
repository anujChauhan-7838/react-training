import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import FormErrors from './FormErrors';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import {connect} from 'react-redux';

class Signin extends Component{
    
    constructor(){
        super();
        this.state = {
            "username":"",
            "password":"",
            "formErrors": {'username': '', 'password': '','gError':''},
            "usernameValid": false,
            "passwordValid": false,
            "formValid": false,
            "showLogBtn":true
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDefault();
        this.validateField('username',this.state.username);
        this.validateField('password',this.state.password);
        this.state.showLogBtn = false;
        axios({
          method:"post",
          url:process.env.REACT_APP_BASEURL+"/auth/login",
          data:{'email':this.state.username,'password':this.state.password}
        }).then((response)=>{
          console.log('response from login');
              console.log(response);
              if(response.data.status == 1){
                   localStorage.setItem('token',response.data.access_token)
                   this.props.dispatch({
                     type:'SIGNIN'
                   })
                   this.props.history.push('/');
              }else{
                this.setState({formErrors:{...this.state.formErrors,gError:response.data.message}});
              }

              this.setState({showLogBtn:true});
              
        }).catch((error)=>{
           
            this.setState({showLogBtn:true});
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

     componentWillUnmount(){
       this.setState({...this.state});
     }
     componentWillUnmount(){
       this.setState = (state,callback)=>{
        return;
    };
     }

    render(){
      var logBtn = <span>Register Now</span>;
      if(!this.state.showLogBtn){
       logBtn =  <span><Spinner animation="border" variant="primary" /></span>
      }
        return (
          <div className="container">
              <div className="panel panel-default">
                   <FormErrors formErrors={this.state.formErrors} />
            </div>
          <div className="signup-form">
          <form onSubmit={(event)=>this.checkFormAndSubmit(event)} method="post">
          <h2>Login</h2>
          
        <div className="form-group">
                <input type="email" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="username" placeholder="Email" required="required" autoComplete="off" style={{"backgroundImage": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "backgroundRepeat": "no-repeat", "backgroundPosition": "99% center", "backgroundSize": "14px"}} />
        </div>
        <div className="form-group">
                  <input type="password" onChange={(event)=>this.handleUserInput(event)} className="form-control" name="password" placeholder="Password" required="required" autoComplete="off" style={{"backgroundImage": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "backgroundRepeat": "no-repeat", "backgroundPosition": "99% center", "backgroundSize": "14px", "cursor": "pointer"}} />
        </div>
          
        <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block" disabled={!this.state.formValid}>{logBtn}</button>
        </div>
        </form>
        <div className="text-center">Already have an account? <Link to="/signup"> Sign Up</Link></div>
        <div className="text-center">I have forgot my password? <Link to="/forgot"> Forgot</Link></div>
      </div>                    
      </div>   
        );
    }
}

export default connect()(Signin); 