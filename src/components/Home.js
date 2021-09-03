
import '../App.css';
import Nav from './Nav';
import Cakelist from './Cakelist';
import Signup from "./Signup";
import Crousal from "./Crousal";
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  
  return (
    <div>
    
<Crousal></Crousal>
   <div className="container">
     <div className="row" style={{"textAlign":"center"}}><strong>Cake List</strong></div>
   
   <Cakelist></Cakelist>

   
   
  
   </div>
   
   </div>
  );
}

export default Home; 
