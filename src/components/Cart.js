import axios from 'axios';
import {useState , useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import queryString   from 'query-string';
import './cart.css'

export default function Cart(){
    var [carts,setCarts] = useState([]);
    var [isLoading,setIsLoading] = useState(false);
    
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
    if(carts.length > 0){
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
                                            <tr key={index}>
                                            <td>
                                                <figure className="itemside align-items-center">
                                                    <div className="aside"><img src={process.env.REACT_APP_IMAGE_URL+"/"+cart.cake.img} className="img-sm" /></div>
                                                    <figcaption className="info"> <a href="#" className="title text-dark" data-abc="true">{cart.cake.name}</a>
                                                        <p className="text-muted small">type: {cart.cake.type} <br /> Flavour: {cart.cake.flavour}</p>
                                                    </figcaption>
                                                </figure>
                                            </td>
                                            <td> <select className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select> </td>
                                            <td>
                                                <div className="price-wrap"> <var className="price">{cart.cake.price}</var></div>
                                            </td>
                                            <td className="text-right d-none d-md-block"> <a href="" className="btn btn-light" data-abc="true"> Remove</a> </td>
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
                        <form>
                            <div className="form-group"> <label>Have coupon?</label>
                                <div className="input-group"> <input type="text" className="form-control coupon" name="" placeholder="Coupon code" /> <span className="input-group-append"> <button className="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <dl className="dlist-align">
                            <dt>Total price:</dt>
                            <dd className="text-right ml-3">$69.97</dd>
                        </dl>
                        <dl className="dlist-align">
                            <dt>Discount:</dt>
                            <dd className="text-right text-danger ml-3">- $10.00</dd>
                        </dl>
                        <dl className="dlist-align">
                            <dt>Total:</dt>
                            <dd className="text-right text-dark b ml-3"><strong>$59.97</strong></dd>
                        </dl>
                        <hr/> <a href="#" className="btn btn-out btn-primary btn-square btn-main" data-abc="true"> Make Purchase </a> <a href="#" className="btn btn-out btn-success btn-square btn-main mt-2" data-abc="true">Continue Shopping</a>
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