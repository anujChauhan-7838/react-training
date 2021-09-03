import { Link, withRouter } from "react-router-dom";
import {useState , useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";
import axios from 'axios';
function Cake(props){
    const cake = props.cake;
   
    let typeClassName = cake.type=="veg"?"green":"red";
    var [isAddingToCart,setIsAddingToCart] = useState(false);

    function viewPage(event , cakeName){
        event.preventDefault();
        props.history.push('/view-cake/'+cakeName);

    }

    function addToCart(event,data){
        event.preventDefault();
      setIsAddingToCart(true);
      axios({
        method:"post",
        url:process.env.REACT_APP_BASEURL+"/auth/add-to-cart",
        data:data
      }).then((response)=>{
          console.log('----cart api--- ');
           console.log(response);
           if(response.data.status == 1){
            toast.success(response.data.message);
           }else{
            toast.error(response.data.message);
           }
           setIsAddingToCart(false);
            
      }).catch((error)=>{
        toast.error(error);
           setIsAddingToCart(false);
      });
    }
    if(isAddingToCart){
     var addToCartBtn = <span><Spinner animation="border" variant="primary" /></span>;
    }else{
     var addToCartBtn = <span>Add To Cart</span>;
    }

    return (
        <div className="col-sm-4" style={{"marginTop":"30px"}}>
           

            <div className="card" style={{"width": "18rem","textAlign":"center"}}>
            <span style={{"color":typeClassName,"padding":"0 .3em"}}>&#9679;&#8414;</span>
              <img src={process.env.REACT_APP_IMAGE_URL+"/"+cake.img} className="card-img-top" alt="..."  style={{"height":"100px"}} />
              <div className="card-body">
                  <h5 className="card-title">{cake.name}</h5>
                  <p className="card-text">{cake.price}</p>
                  <button className="btn btn-primary" onClick={(event)=>addToCart(event,cake)}>{addToCartBtn}</button>&nbsp;
                  <button onClick={(event) => viewPage(event,cake.name) } className= "btn btn-primary">View Cake</button>
              </div>
              </div>
              
        </div> 
             
    )
}

export default withRouter(Cake);