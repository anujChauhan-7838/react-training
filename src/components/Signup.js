import React from "react";
import { Component } from "react";
import FormErrors from './FormErrors';

class Signup extends Component{
    
    constructor(){
        super();
        this.state = {
            "name":"",
            "username":"",
            "password":"",
            "cpassword":"",
            "formErrors": {'username': '', 'password': '','name':'','cpassword':''},
            "nameValid": false,
            "usernameValid": false,
            "passwordValid": false,
            "cpasswordValid": false,
            "formValid": false
        }
    }

    checkFormAndSubmit = (event) =>{
        event.preventDeafult();
        this.validateField('name',this.state.name);
        this.validateField('username',this.state.username);
        this.validateField('password',this.state.password);
        this.validateField('cpassword',this.state.cpassword);
        

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
        return (
            <div>
            <div className="formErrors">
                <FormErrors formErrors={this.state.formErrors} />
            </div>
            <form method="post"  onSubmit={(event) => this.checkFormAndSubmit(event)}>
            <div className={`form-group
                 ${this.errorClass(this.state.formErrors.name)}`}>
              <label htmlFor="exampleInputName">Name</label>
              <input type="text" name="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name" onChange={(event) => this.handleUserInput(event)}/>
              <small id="nameHelp" className="form-text text-muted"></small>
            </div>
            <div className={`form-group
                 ${this.errorClass(this.state.formErrors.username)}`}>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event) => this.handleUserInput(event)}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className={`form-group
                 ${this.errorClass(this.state.formErrors.password)}`}>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password"  name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event) => this.handleUserInput(event)} />
            </div>
            <div className={`form-group
                 ${this.errorClass(this.state.formErrors.cpassword)}`}>
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password"  name="cpassword" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event) => this.handleUserInput(event)} />
            </div>
            <button type="submit" className="btn btn-primary"  
               disabled={!this.state.formValid}>Submit</button>
          </form>
          </div>
         
        );
    }
}

export default Signup;