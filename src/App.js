import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Cake from './components/Cake';
var cke = [
  {
    name:"Chocolate 1",
    price:600,
    image:"cake.jpg",
    type:"veg"
},

{
  name:"Chocolate 2",
  price:600,
  image:"cake_2.jpg",
  type:"nveg"
},

{
  name:"Chocolate 3",
  price:600,
  image:"cake_3.jpg",
  type:"veg"
},
{
  name:"Chocolate 4",
  price:600,
  image:"cake_4.jpg",
  type:"nveg"
},
{
  name:"Chocolate 5",
  price:600,
  image:"cake_5.jpg",
  type:"veg"
},
{
  name:"Chocolate 6",
  price:600,
  image:"cake.jpg",
  type:"veg"
},
{
  name:"Chocolate 4",
  price:600,
  image:"cake_4.jpg",
  type:"nveg"
},
{
  name:"Chocolate 6",
  price:600,
  image:"cake.jpg",
  type:"veg"
},
{
  name:"Chocolate 7",
  price:600,
  image:"cake_3.jpg",
  type:"veg"
},
{
  name:"Chocolate 8",
  price:600,
  image:"cake.jpg",
  type:"veg"
},
{
  name:"Chocolate 9",
  price:600,
  image:"cake_5.jpg",
  type:"veg"
},
{
  name:"Chocolate 10",
  price:600,
  image:"cake_2.jpg",
  type:"veg"
},
{
  name:"Chocolate 11",
  price:600,
  image:"cake.jpg",
  type:"veg"
},
{
  name:"Chocolate 12",
  price:600,
  image:"cake_4.jpg",
  type:"veg"
}
];

function App() {
  return (
    <div>
   <Nav></Nav>
   <div className="container">
     <div className="row" style={{"textAlign":"center"}}><strong>Cake List</strong></div>
   <div className="row">
   <Cake cakes={cke}></Cake>
   </div>
   </div>
   
   </div>
  );
}

export default App;
