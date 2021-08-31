import Cake from './Cake';
import axios from 'axios';
import {useState , useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';

class Search extends Component{
       
      constructor(props){
          super();
          this.state = {
              cakes:[],
              searching:true,
              searchBy:props.match.params.searchBy
          }
      }

      componentDidMount(){
        this.fetchData(this.state.searchBy);
      }

      fetchData = (searchBy) =>{
          this.setState({searching:true,cakes:[]});
        axios({
            method:"get",
            url:"https://mighty-refuge-98472.herokuapp.com/cake-list?search="+searchBy
        }).then((response)=>{
              console.log('Search By');
              console.log(response.data);
              this.setState({searching:false});
              this.setState({cakes:response.data});
              
        }).catch((error)=>{
            console.log('Cake list is not loaded'+error);
            this.setState({searching:false});
            this.setState({cakes:[]});  
            
        });
      }

      componentDidUpdate(prevProps){
          console.log("prevProps" , prevProps);
          console.log("prevState",this.props);
          if(prevProps.match.params.searchBy != this.props.match.params.searchBy){
              this.setState({searchBy:this.props.match.params.searchBy});
              this.fetchData(this.props.match.params.searchBy);
          }
         

      }
   
     render(){
       
        if(this.state.cakes.length > 0 ){
            return (
                <div className="container">
                <div className="row">
                {
                        this.state.cakes.map((cake,index)=>
                        <Cake cake={cake} key={index}></Cake>
                )
                }
                </div>
                </div>
            );
        }else{
            if(this.state.searching){
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
    
}


export default Search;