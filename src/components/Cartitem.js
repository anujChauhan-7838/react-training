import axios from 'axios';
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from "react-toastify";
import {connect} from 'react-redux';

 function Cartitem(props){
    var priceArr = props.cart.cake.price.split('$');
    var price    = parseInt(priceArr[1]);
    if(props.isRemovingFromCart){
        var removeBtnVal  = <Spinner animation="border" variant="primary" />
    }else{
        var removeBtnVal  = 'Remove'
    }
    return (
        <tr>
                                            <td>
                                                <figure className="itemside align-items-center">
                                                    <div className="aside"><img src={process.env.REACT_APP_IMAGE_URL+"/"+props.cart.cake.img} className="img-sm" /></div>
                                                    <figcaption className="info"> <a href="#" className="title text-dark" data-abc="true">{props.cart.cake.name}</a>
                                                        <p className="text-muted small">type: {props.cart.cake.type} <br /> Flavour: {props.cart.cake.flavour}</p>
                                                    </figcaption>
                                                </figure>
                                            </td>
                                            <td> <select className="form-control" onChange={(event) =>props.increaseQnty(event,props.index)} value={props.cart.qty}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select> </td>
                                            <td>
                                                <div className="price-wrap"> <var className="price">${ price}</var></div>
                                            </td>
                                            <td className="text-right d-none d-md-block"> <a href="" className="btn btn-light" data-abc="true" onClick={(event)=>props.removeItemFromCart(event,props.index)}>{removeBtnVal}</a> </td>
                                        </tr>
    )
}

export default connect()(Cartitem)