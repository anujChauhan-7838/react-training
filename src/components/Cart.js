import axios from 'axios';
import {useState , useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import queryString   from 'query-string';
import './cart.css'
import { toast } from "react-toastify";
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import Cartitem from './Cartitem';

function Cart(props){
    var [carts,setCarts] = useState([]);
    var [isLoading,setIsLoading] = useState(false);
    var [discount,setDiscount] = useState(0);
    var [qty,setQty] = useState(1);
    var [couponCode,setCouponCode] = useState('');
    var [couponCodeError,setCouponCodeError] = useState('');
    var [couponCodeApplied,setCouponCodeApplied] = useState('');
    var [isRemovingFromCart,setIsRemovingFromCart] = useState(false);
    var [name,setName] = useState('');
    var [mobileNo,setMobileNo] = useState('');
    var [address,setAddress] = useState('');
    var [pincode,setPincode] = useState(''); 
    var [nameError,setNameError] = useState(false);
    var [mobileError,setMobileError] = useState(false);
    var [addressError,setAddressError] = useState(false);
    var [pincodeError,setPincodeError] = useState(false);



   
   
    
    
    useEffect(()=>{
        setCarts([]);
        setIsLoading(true);
        axios({
            method:"get",
            url:process.env.REACT_APP_BASEURL+"/auth/get-cart-products"
        }).then(function(response){
            setIsLoading(false);
            setCarts(response.data.data);
              
        }).catch(function(error){
            setIsLoading(false);
            setCarts([]);     
            
        });
    },[])


   var  increaseQnty = (event ,index) => {
         
         var refreshingData = carts
         refreshingData[index].qty = parseInt(event.target.value);
         
         setCarts([...refreshingData]); 
         axios({
            method:"post",
            url:process.env.REACT_APP_BASEURL+"/auth/update-p-cart",
            data:{'cartId':carts[index].id,'qty':event.target.value}
          }).then((response)=>{
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
        var refreshingData = carts
        setIsRemovingFromCart(true);

        
        axios({
           method:"post",
           url:process.env.REACT_APP_BASEURL+"/auth/remove-cart-item",
           data:{'cartId':carts[index].id}
         }).then((response)=>{
               if(response.data.status == 1){
                refreshingData.splice(index,1);
               
                setCarts([...refreshingData]); 
                setIsRemovingFromCart(false);
                toast.success(response.data.message);
                props.dispatch({
                    type:'DESCCARTCOUNT'
                   
                })
               }else{
                setIsRemovingFromCart(false);
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

    var handleInput = (event , varName)=>{
           if(varName == 'name'){
               setName(event.target.value);
               setNameError(false);
           }else if(varName == 'mobile'){
            setMobileNo(event.target.value);
            setMobileError(false)

        }else if(varName == 'address'){
            setAddress(event.target.value);
            setAddressError(false)
        }else if(varName == 'pincode'){
            setPincode(event.target.value);
            setPincodeError(false)
        }
    }

    var moveToPaymentDetailPage = (event ,grandTotal) =>{
        event.preventDefault();
        
        if(name == ''){
            setNameError(true);
            return true;
        }else if(mobileNo == '' || mobileNo.length > 10 ||mobileNo.length < 10 ){
            setMobileError(true);
            return true;
        }else if(address == ''){
            setAddressError(true);
            return true;
        }else if(pincode == ''){
            setPincodeError(true);
            return true;
        }
        var orderInfo = {
            'orderId':'',
            'userId':8,
            'grandTotal':grandTotal,
            'couponCode':couponCode,
            'couponDiscount':discount,
            'paymentStatus':0,
            'orderStatus':0,
            'orderItems':[...carts],
            'userInfo':{
                'name':name,
                'mobileNo':mobileNo,
                'address':address,
                'pincode':pincode
            }
        }
        props.dispatch({type:'GENERATE_ORDER','payload':orderInfo});
        props.history.push('/payment');

       
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
                                       
                                       
                                        return (
                                            <Cartitem key={index} index={index}  isRemovingFromCart={isRemovingFromCart} cart={cart} increaseQnty={increaseQnty} removeItemFromCart={removeItemFromCart}></Cartitem>
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
                <form onSubmit={(event)=>moveToPaymentDetailPage(event,grandTotal)}>
                <div className="card mb-3">
                    <div className="card-body">
                        <h6 className="">Address</h6>
                        
                            <div className="form-group" >
                                <div className="input-group"> 
                                <input type="text" className="form-control coupon" onChange={(event)=>handleInput(event,'name')} name="name" placeholder="Enter Your Name" /> 
                                 </div>
                                 {nameError && <p style={{"color":"red"}}>Invalid Name</p>}
                            </div>

                            <div className="form-group" >
                                <div className="input-group"> 
                                <input type="text" className="form-control coupon" onChange={(event)=>handleInput(event,'mobile')} name="mobile" placeholder="Enter Your Contact Number" /> 
                                 </div>
                                 {mobileError && <p style={{"color":"red"}}>Invalid Mobile number. Only 10 numeric digits are allowed</p>}
                            </div>

                            <div className="form-group" >
                                <div className="input-group"> 
                                <input type="text" className="form-control coupon" onChange={(event)=>handleInput(event,'address')} name="address" placeholder="Enter Your Address" /> 
                                 </div>
                                 {addressError && <p style={{"color":"red"}}>Invalid Address</p>}
                            </div>

                            <div className="form-group" >
                                <div className="input-group"> 
                                <input type="text" className="form-control coupon" onChange={(event)=>handleInput(event,'pincode')} name="pincode" placeholder="Enter Your Pincode" /> 
                                 </div>
                                 {pincodeError && <p style={{"color":"red"}}>Invalid Pincode</p>}
                            </div>
                        
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
                        <hr/> <button type="submit" className="btn btn-out btn-primary btn-square btn-main"> Make Purchase </button> <Link to="/" className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Continue Shopping</Link>
                    </div>
                  
                </div>
                </form>
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