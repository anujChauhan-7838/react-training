import { Link, withRouter } from "react-router-dom";
function Cake(props){
    console.log(props);
    const cake = props.cake;
    console.log(cake)
    let typeClassName = cake.type=="veg"?"green":"red";

    function viewPage(event , cakeName){
        event.preventDefault();
        props.history.push('/view-cake/'+cakeName);

    }
    return (
        <div className="col-sm-4" style={{"marginTop":"30px"}}>
            <div className="card" style={{"width": "18rem","textAlign":"center"}}>
            <span style={{"color":typeClassName,"padding":"0 .3em"}}>&#9679;&#8414;</span>
              <img src={"https://mighty-refuge-98472.herokuapp.com/images/"+cake.img} className="card-img-top" alt="..."  style={{"height":"100px"}} />
              <div className="card-body">
                  <h5 className="card-title">{cake.name}</h5>
                  <p className="card-text">{cake.price}</p>
                  <a href="#" className="btn btn-primary">Add To Cart</a>&nbsp;
                  <a onClick={(event) => viewPage(event,cake.name) } className= "btn btn-primary">View Cake</a>
              </div>
              </div>
              
        </div> 
             
    )
}

export default withRouter(Cake);