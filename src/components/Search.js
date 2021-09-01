import Cake from './Cake';
import axios from 'axios';
import {useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import queryString   from 'query-string';

export default function Search(props){
    
    var [cakes,setCakes] = useState([]);
    var [searching,setSearching] = useState(true);
    var query = queryString.parse(props.location.search);
    
    var [search,setSearch] = useState(query.search);
    
    
    useEffect(()=>{
        setCakes([]);
        setSearching(true);
        axios({
            method:"get",
            url:"https://mighty-refuge-98472.herokuapp.com/cake-list?search="+query.search
        }).then(function(response){
              
              setSearching(false);
              setCakes(response.data);
              
        }).catch(function(error){
            
            setSearching(false);
            setCakes([]);     
            
        });
    },[query.search])
     


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