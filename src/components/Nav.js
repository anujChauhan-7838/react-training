import React from "react";
import {Link , withRouter,useLocation} from "react-router-dom";
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import  queryString from 'query-string';
import {connect} from 'react-redux';
import axios from 'axios';


function Nav(props){
    var [searchInvalid,setSearchInvalid] = useState(false);
    var query                            = queryString.parse(useLocation().search);
    var initSearch = typeof query.search != 'undefined'? query.search : '';
    var [search, setSearch] = useState(initSearch);
    props.dispatch({
      type:'CHECKLOGIN'
    })
    props.dispatch({
             type:'GETCHECKOUTCOUNT',
    })
   

function handleSearchForm(event){
  event.preventDefault();
  validateField(search);
  if(search != ''){
    props.history.push('/search?search='+search);
  }
}


function handleInputBx(event){
  var name = event.target.name;
  var value= event.target.value;
  setSearch(value);
  validateField(value);

}

function logout(event){
    event.preventDefault();
    localStorage.removeItem("token");
    props.dispatch({
      type:"LOGOUT"
    })
    props.history.push('/signin');
}

function validateField(value){
  if(value  == ''){
    setSearchInvalid(true);
  }else{
    setSearchInvalid(false);
  }
}



      

   
      return  (
      
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
 
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/"><img src={window.location.origin+"/assests/images/logo.png"}  style={{width:"91px"}}/></Link> 
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0" onSubmit={(event)=>handleSearchForm(event)}>
      <input value={search} className={"form-control mr-sm-2" + (searchInvalid ? "border border-danger":'')} type="text"  name = "search" placeholder="Search" aria-label="Search" onChange={(event)=>handleInputBx(event)} />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      {!props.isLoggedIn?<div><button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/signin">
       Sign In
     </Link>
     </button>
     <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/signup">
       Sign Up
     </Link>
     </button></div>:<div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
      <Link to="/cart" className="btn btn-outline-success my-2 my-sm-0">
       cart<sup style={{"color":"red"}}><strong>{props.cartItem}</strong></sup> 
     </Link>
        <li className="nav-item dropdown">
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(event)=>logout(event)}>
       Logout
     
     </button>
          
        </li>
      </ul>
    </div>}
    </form>
    
  </div>
</nav>
    );
  
}

export default connect(function(state,props){
  console.log('reducer state nav') ;
  console.log(state);
  return {
    isLoggedIn:state.isLoggedIn,
    cartItem:state.cartItem
  }
})(withRouter(Nav));