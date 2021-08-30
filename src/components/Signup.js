import React from "react";
import { Component } from "react";
import {Link} from "react-router-dom";
import FormErrors from './FormErrors';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

class Signup extends Component{
    
    constructor(props){
        super();
        this.state = {
            "name":"",
            "username":"",
            "password":"",
            "cpassword":"",
            "formErrors": {'username': '', 'password': '','name':'','cpassword':'','gError':''},
            "nameValid": false,
            "usernameValid": false,
            "passwordValid": false,
            "cpasswordValid": false,
            "formValid": false,
            "showRegBtn":true
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDefault();
        this.validateField('name',this.state.name);
        this.validateField('username',this.state.username);
        this.validateField('password',this.state.password);
        this.validateField('cpassword',this.state.cpassword);
        this.state.showRegBtn = false;
        axios({
          method:"post",
          url:"https://mighty-refuge-98472.herokuapp.com/auth/register",
          data:{name:this.state.name,'email':this.state.username,'password':this.state.password}
        }).then((response)=>{
              console.log('Register api -----')
              console.log(response.data);
              if(response.data.status == 1){
                   this.props.history.push('/otp-verify');
              }else{
                this.setState({formErrors:{...this.state.formErrors,gError:response.data.message}});
              }

              this.setState({showRegBtn:true});
              
        }).catch((error)=>{
            console.log('Cake list is not loaded'+error);
            this.setState({showRegBtn:true});
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
        let nameValid     =this.state.nameValid;
        let cpasswordValid     =this.state.cpasswordValid;
      
        switch(fieldName) {
            case 'name':
                if(value == ''){
                    nameValid = false;
                    fieldValidationErrors.name = nameValid ? '' : ' is required';
                }else{
                    nameValid = value.match(/^[a-zA-Z]*$/i);
                    console.log('nameValue = '+nameValid);
                    fieldValidationErrors.name = nameValid ? '' : ' is invalid';
                }
                
                break;
          case 'username':
            usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
        case 'cpassword':
                cpasswordValid = value.length >= 6;
                fieldValidationErrors.cpassword = cpasswordValid ? '': ' is too short';
                if(cpasswordValid && this.state.password != value){
                    cpasswordValid = false;
                    fieldValidationErrors.cpassword = cpasswordValid ? '': ' password does not matches';
                }
                break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        usernameValid: usernameValid,
                        passwordValid: passwordValid,
                        nameValid:nameValid,
                        cpasswordValid:cpasswordValid
                      }, this.validateForm);
      }
      
      validateForm = () =>{
        this.setState({formValid: this.state.nameValid && this.state.usernameValid && this.state.passwordValid && this.state.cpasswordValid});
      }

      errorClass = (error) =>{
        return(error.length === 0 ? '' : 'has-error');
     }

    render(){
      var regBtn = <span>Register Now</span>;
      if(!this.state.showRegBtn){
       regBtn =  <span><Spinner animation="border" variant="primary" /></span>
      }
        return (
          <div className="container">
            <div className="panel panel-default">
                   <FormErrors formErrors={this.state.formErrors} />
            </div>
          <div className="signup-form">
          <form onSubmit={(event)=>this.checkFormAndSubmit(event)}>
          <h2>Register</h2>
          <p className="hint-text">Create your account. It's free and only takes a minute.</p>
              <div className="form-group">
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" name="name" placeholder="Name" required="required"  onChange={(event) =>this.handleUserInput(event)}/>
                </div>
              
            </div>        	
              </div>
              <div className="form-group">
                <input type="email" className="form-control" name="username" placeholder="Email" required="required" onChange={(event) =>this.handleUserInput(event)} autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px"}} />
              </div>
          <div className="form-group">
                  <input type="password" className="form-control" name="password" onChange={(event) =>this.handleUserInput(event)} placeholder="Password" required="required" autocomplete="off" style={{"background-image": "url(&quot;chrome-extension://igkpcodhieompeloncfnbekccinhapdb/images/vault-white-48.svg&quot;)", "background-repeat": "no-repeat", "background-position": "99% center", "background-size": "14px", "cursor": "pointer"}} />
              </div>
          <div className="form-group">
                  <input type="password" className="form-control" name="cpassword" onChange={(event) =>this.handleUserInput(event)} placeholder="Confirm Password" required="required" />
              </div>        
              
          <div className="form-group">
                  <button type="submit" class="btn btn-success btn-lg btn-block" disabled={!this.state.formValid}>
                       {regBtn}
                    </button>
                    
                    
              </div>
          </form>
        <div class="text-center">Already have an account? <Link to="/signin"> Sign in</Link></div>
      </div>                    
      </div>   
        );
    }
}

export default Signup; 