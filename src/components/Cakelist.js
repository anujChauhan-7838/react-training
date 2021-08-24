import Cake from './Cake';
export default function Cakelist(props){
    const cakes = props.cakes;
    return (
        cakes.map((cake,index)=>
               <Cake cake={cake} key={index}></Cake>
        )
             
    );
} 