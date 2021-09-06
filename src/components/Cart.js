import axios from 'axios';
import {useState , useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import queryString   from 'query-string';
import './cart.css'
import { toast } from "react-toastify";
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

function Cart(props){
    var [carts,setCarts] = useState([]);
    var [isLoading,setIsLoading] = useState(false);
    var [discount,setDiscount] = useState(0);
    var [qty,setQty] = useState(1);
    var [couponCode,setCouponCode] = useState('');
    var [couponCodeError,setCouponCodeError] = useState('');
    var [couponCodeApplied,setCouponCodeApplied] = useState('');
    
    useEffect(()=>{
        setCarts([]);
        setIsLoading(true);
        axios({
            method:"get",
            url:process.env.REACT_APP_BASEURL+"/auth/get-cart-products"
        }).then(function(response){
            setIsLoading(false);
            console.log('---------Set Item--------');
            console.log(response)
            setCarts(response.data.data);
            console.log(carts);
              
        }).catch(function(error){
            setIsLoading(false);
            setCarts([]);     
            
        });
    },[])


   var  increaseQnty = (event ,index) => {
         console.log(event.target.value,index);
         var refreshingData = carts
         refreshingData[index].qty = parseInt(event.target.value);
         console.log(refreshingData);
         setCarts([...refreshingData]); 
         axios({
            method:"post",
            url:process.env.REACT_APP_BASEURL+"/auth/update-p-cart",
            data:{'cartId':carts[index].id,'qty':event.target.value}
          }).then((response)=>{
            console.log('response from update cart');
                console.log(response);
                if(response.data.status == 1){
                }else{
                    toast.error(response.data.message);
                }
                
          }).catch((error)=>{
            toast.error(error);
          });
        
    }


    var removeItemFromCart = (event,index)=>{
        event.preventDefault();
        console.log(event.target.value,index);
        var refreshingData = carts
        
        axios({
           method:"post",
           url:process.env.REACT_APP_BASEURL+"/auth/remove-cart-item",
           data:{'cartId':carts[index].id}
         }).then((response)=>{
           console.log('response from update cart');
               
               if(response.data.status == 1){
                refreshingData.splice(index);
                console.log(refreshingData);
                setCarts([...refreshingData]); 
                toast.success(response.data.message);
                props.dispatch({
                    type:'DESCCARTCOUNT'
                   
                })
               }else{
                   toast.error(response.data.message);
               }
               
         }).catch((error)=>{
           toast.error(error);
         });
    }

   var  handleCouponCodeInput = (event) => {
        setCouponCode(event.target.value);
        setCouponCodeError('');
        
    }

    var submitCouponCode = (event) =>{
        event.preventDefault();
        if(couponCode == 'DISCOUNT50'){
           setDiscount(50);
           setCouponCodeApplied('Coupon Successfully Applied');
        }else{
            setCouponCodeApplied('');
            setCouponCodeError('Invalid Coupon');
        }
    }
    if(carts.length > 0){
        let totalAmount = 0;
        for (const [i, cart] of carts.entries()) {
            var priceTagArr = cart.cake.price.split('$');
            totalAmount = totalAmount + cart.qty * parseInt(priceTagArr[1]);
        }  
        let grandTotal = totalAmount - discount;
        return (
      
            <div className="container-fluid">
        <div className="row">
            <aside className="col-lg-9">
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-borderless table-shopping-cart">
                            <thead className="text-muted">
                                <tr className="small text-uppercase">
                                    <th scope="col">Cake</th>
                                    <th scope="col" width="120">Quantity</th>
                                    <th scope="col" width="120">Price</th>
                                    <th scope="col" className="text-right d-none d-md-block" width="200"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                    carts.map((cart,index)=>{
                                        var priceArr = cart.cake.price.split('$');
                                        var price    = parseInt(priceArr[1]);
                                        return (
                                            <tr key={index}>
                                            <td>
                                                <figure className="itemside align-items-center">
                                                    <div className="aside"><img src={process.env.REACT_APP_IMAGE_URL+"/"+cart.cake.img} className="img-sm" /></div>
                                                    <figcaption className="info"> <a href="#" className="title text-dark" data-abc="true">{cart.cake.name}</a>
                                                        <p className="text-muted small">type: {cart.cake.type} <br /> Flavour: {cart.cake.flavour}</p>
                                                    </figcaption>
                                                </figure>
                                            </td>
                                            <td> <select className="form-control" onChange={(event) =>increaseQnty(event,index)} value={cart.qty}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select> </td>
                                            <td>
                                                <div className="price-wrap"> <var className="price">${ price}</var></div>
                                            </td>
                                            <td className="text-right d-none d-md-block"> <a href="" className="btn btn-light" data-abc="true" onClick={(event)=>removeItemFromCart(event,index)}> Remove</a> </td>
                                        </tr>
                                        )
                                    })
                                }
                                
                                
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </aside>
            <aside className="col-lg-3">
                <div className="card mb-3">
                    <div className="card-body">
                        <form onSubmit={(event)=>submitCouponCode(event)}>
                            <div className="form-group" > <label>Have coupon?</label>
                                <div className="input-group"> 
                                <input type="text" className="form-control coupon" onChange={(event)=>handleCouponCodeInput(event)} name="couponCode" placeholder="Coupon code" /> <span className="input-group-append">
                                     <button className="btn btn-primary btn-apply coupon" type="submit" >Apply</button> </span> </div>
                            </div>
                            {couponCodeError && <p style={{'color':'red'}}>{couponCodeError}</p>}
                            {couponCodeApplied && <p style={{'color':'green'}}>{couponCodeApplied}</p>}
                        </form>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <dl className="dlist-align">
                            <dt>Total price:</dt>
                            <dd className="text-right ml-3">${totalAmount}</dd>
                        </dl>
                        <dl className="dlist-align">
                            <dt>Discount:</dt>
                            <dd className="text-right text-danger ml-3">- ${discount}</dd>
                        </dl>
                        <dl className="dlist-align">
                            <dt>Total:</dt>
                            <dd className="text-right text-dark b ml-3"><strong>${grandTotal}</strong></dd>
                        </dl>
                        <hr/> <a href="#" className="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Make Purchase </a> <Link to="/" className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Continue Shopping</Link>
                    </div>
                </div>
            </aside>
        </div>
    </div>
        )
    }else{
        if(isLoading){
            return (
                <div className="container">
                <div className="row" style={{"textAlign":"center"}}>
                    <span style={{"marginTop":"200px"}}><Spinner animation="border" variant="primary" /></span>
                </div>
                </div>
            )
        }else{
            return (
                <div className="row" style={{"textAlign":"center"}}>
                    <span style={{"marginTop":"200px"}}>No Item Found</span>
                </div>
            )
        }
    }
    
}


export default connect()(Cart)