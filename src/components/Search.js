import Cake from './Cake';
import axios from 'axios';
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

export default function Search(props){
    console.log(props);
    var [cakes,setCakes] = useState([]);
    var [searching,setSearching] = useState(true);
    
 

    useEffect(()=>{
        axios({
            method:"get",
            url:"https://mighty-refuge-98472.herokuapp.com/cake-list?search="+props.match.params.searchBy
        }).then(function(response){
              console.log(response.data);
              setSearching(false);
              setCakes(response.data);
              
        }).catch(function(error){
            console.log('Cake list is not loaded'+error);
            setSearching(false);
            setCakes([]);     
            
        });
    },[])
     


    if(cakes.length > 0 ){
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