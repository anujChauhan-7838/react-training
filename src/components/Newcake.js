import { Link, withRouter } from "react-router-dom";
import { Rating, RatingView } from 'react-simple-star-rating'
import {useState , useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";
import axios from 'axios';
import {connect} from 'react-redux';
function Newcake(props){
    
    const cake = props.cake;
    var [isAddingToCart,setIsAddingToCart] = useState(false);
    let typeClassName = cake.type=="veg"?"green":"red";

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
            
             if(response.data.status == 1){
              toast.success(response.data.message);
              props.dispatch({
               type:'UPDATECHECKOUTCOUNT',
               'cartCount':response.data.data.length
             })
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
        <div className="col-sm-4" style={{"marginTop":"30px",width:"100%"}}>
        <h1 style={{'marginLeft':"160px"}}>{cake.name}</h1>
        <div className="container mt-5" style={{"width":"1100px"}}>
   <div className="row justify-content-md-center" style={{'marginLeft':"27px"}}>
      <div className="col-md-12">
         <div className="card">
            <div className="card-body">
               <div className="container">
                  <div className="row">
                     <div className="col">
                     <img className="img-thumbnail" alt="..." src={process.env.REACT_APP_IMAGE_URL+'/'+cake.img}/></div>
                     <div className="col-6">
                        <div className="card" style={{"border":"none"}}>
                           <div className="card-body">
                              <h4 className="card-title">{cake.name}</h4>
                              <h6><Rating  ratingValue={cake.rating} /* Rating Props */ /></h6>
                              <h5><span className="">{cake.price}</span></h5>
                              <p className="card-text">{cake.desc}</p>
                              <table className="table">
                                 <tbody>
                                    <tr>
                                       <th scope="row">Likes</th>
                                       <td>{cake.likes}</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Ratings</th>
                                       <td>{cake.rating}</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Type</th>
                                       <td>{cake.type}</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Flavour</th>
                                       <td>{cake.flavour}</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Weight</th>
                                       <td>{cake.weight}</td>
                                    </tr>
                                 </tbody>
                              </table>
                              <p>
                              <button type="button" className="btn btn-success" onClick={(event)=>addToCart(event,cake)}>{addToCartBtn}</button>
                              </p>
                           </div>
                        </div>
                     </div>
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>     


              
        </div> 
             
    )
}

export default connect()(withRouter(Newcake));