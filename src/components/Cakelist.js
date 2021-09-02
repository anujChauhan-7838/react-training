import Cake from './Cake';
import axios from 'axios';
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
export default function Cakelist(props){
    
    var [cakes,setCakes] = useState([]);

    useEffect(()=>{
        axios({
            method:"get",
            url:"https://mighty-refuge-98472.herokuapp.com/cake-list"
        }).then(function(response){
              
              setCakes(response.data);
              
        }).catch(function(error){
            
            setCakes([]);     
            
        });
    },[])
     


    if(cakes.length > 0){
        return (
            <div className="row">
            {
                    cakes.map((cake,index)=>
                    <Cake cake={cake} key={index}></Cake>
            )
            }
            </div>
        );
    }else{
       return (
           <div className="row" style={{"textAlign":"center"}}>
               <span style={{"marginTop":"200px"}}><Spinner animation="border" variant="primary" /></span>
           </div>
       )
    }
    
}