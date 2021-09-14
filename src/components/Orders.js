import axios from 'axios';
import {useState , useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

function Orders(props){
     var [orders,setOrders] = useState([]);
     var [address,setAddress] = useState('');
     var [isloadingOrders,setIsloadingOrders] = useState(true);
     
    useEffect(()=>{
        props.dispatch({type:'GETCHECKOUTCOUNT'})
        setIsloadingOrders(true);
        axios({
            method:"get",
            url:process.env.REACT_APP_BASEURL+"/auth/order-list",
        }).then(function(response){
           
            setIsloadingOrders(false);
              if(typeof response.data.data.orderList != 'undefined'){
                
                  setOrders(response.data.data.orderList);
              }
              if(typeof response.data.data.address != ''){
                setAddress(response.data.data.address);
            }
        }).catch(function(error){
            setIsloadingOrders(false);
        });
    },[]);

   function makePayment(event , id){
       
        event.preventDefault();
        props.dispatch({
            type:"SAVEORDERID",
            payload:id
        });
        
        props.history.push('/payment');
    }

    function trackOrder(event,id){
        event.preventDefault();
        alert('We will let you know , when your order is ready to ship. Thank You');
    }

    if(orders.length > 0){
        return (
    
          
            <div className="container mt-5">
                 <h1>Orders</h1>
                 {
                     orders.map((order, index)=>{ return (
                         
                         
                            <div className="card mb-5" key={index}>
                            <div className="card-body">
                            <h2>Order Number #{order.orderId}</h2>
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Img</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.get_order_list.map((item,index)=>{return (
                                     <tr key={index}>
                                     <th scope="row" >
                                         <img src={process.env.REACT_APP_IMAGE_URL+"/"+item.img} style={{'width':'50px', 'height':'50px'}}/>
                                     </th>
                                     <td>{item.name}</td>
                                     <td>{item.price}</td>
                                     </tr>
                                )})}
                                
                            </tbody>
                           </table>
                           <div className="pricing-tab d-flex justify-content-end">
                               <span className=""><strong>Grand Total</strong>: ${order.grandTotal}</span>
                           </div>
                           <div className="pricing-tab d-flex justify-content-end mt-3 mb-3">
                               {order.paymentStatus == '0' &&<button onClick={(event)=>makePayment(event,order.id)} className="btn btn-primary">Make Payment</button>}
                               {order.paymentStatus == '1' &&<button onClick={(event)=>trackOrder(event,order.id)} className="btn btn-primary">Track Your Order</button>}
                           
                           </div>
                            </div>
                            </div>
                       
                        
                     )})


                 }
                 </div>
                
          
        )
    }else{ if(isloadingOrders){
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
                <span style={{"marginTop":"200px"}}>No Order Found</span>
            </div>
        )
    }
    }

   
}


export default connect()(Orders);