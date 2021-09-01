import axios from 'axios';
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import Newcake from './Newcake';
export default function Cakeview(props){
    var [cakes,setCakes] = useState([]);
    var [searching,setSearching] = useState(true);

    useEffect(()=>{
        axios({
            method:"get",
            url:"https://mighty-refuge-98472.herokuapp.com/cake-list?search="+props.match.params.cakeSlug
        }).then(function(response){
             
              setCakes(response.data);
              
        }).catch(function(error){
            
            setCakes([]);     
            
        });
    },[])

    if(cakes.length > 0 ){
        return (
            <div className="row">
            {
                    cakes.map((cake,index)=>
                    <Newcake cake={cake} key={index}></Newcake>
            )
            }
            </div>
        );
    }else{
        if(searching){
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
                    <span style={{"marginTop":"200px"}}>No Cake Found</span>
                </div>
            )
        }
       
    }
   
    
}