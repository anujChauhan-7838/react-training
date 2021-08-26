
export default function Cake(props){
    const cake = props.cake;
    console.log(cake)
    let typeClassName = cake.type=="veg"?"green":"red";
    return (
        
        <div className="col-sm-4" style={{"marginTop":"30px"}}>
            <div className="card" style={{"width": "18rem","textAlign":"center"}}>
            <span style={{"color":typeClassName,"padding":"0 .3em"}}>&#9679;&#8414;</span>
              <img src={"assests/images/"+cake.image} className="card-img-top" alt="..."  style={{"height":"100px"}} />
              <div className="card-body">
                  <h5 className="card-title">{cake.name}</h5>
                  <p className="card-text">{"$"+cake.price}</p>
                  <a href="#" className="btn btn-primary">Add To Cart</a>
              </div>
              </div>
              
        </div> 
             
    )
}