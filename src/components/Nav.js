import React from "react";
import {Link , withRouter} from "react-router-dom";
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function Nav(props){
    var [search, setSearch] = useState('');
    var [searchInvalid,setSearchInvalid] = useState(false);
    


function handleSearchForm(event){
  event.preventDefault();
  validateField(search);
  if(search != ''){
    props.history.push('/search/'+search);
  }
}


function handleInputBx(event){
  var name = event.target.name;
  var value= event.target.value;
  console.log(name , value);
  setSearch(value);
  validateField(value);

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
        <Link className="nav-link" to="/">Home</Link> 
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0" onSubmit={(event)=>handleSearchForm(event)}>
      <input className={"form-control mr-sm-2" + (searchInvalid ? "border border-danger":'')} type="text"  name = "search" placeholder="Search" aria-label="Search" onChange={(event)=>handleInputBx(event)} />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/signin">
      Sign In
    </Link>
    </button>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><Link to="/signup">
      Sign Up
    </Link>
    </button>
    </form>
    
  </div>
</nav>
    );
  
}

export default withRouter(Nav);