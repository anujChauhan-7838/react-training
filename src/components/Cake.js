
export default function Cake(props){
    var elem = '';
    for(var i=0;i<10;i++){
      elem = elem + <li>ANuj chauahn</li>
    }
    const cakes = props.cakes;
    return (
        cakes.map((cake)=>{
            let typeClassName = cake.type=="veg"?"green":"red";
            return (<div className="col-sm-4" style={{"margin-top":"30px"}}>
                <div class="card" style={{"width": "18rem","text-align":"center"}}>
                <span style={{"color":typeClassName,"padding":"0 .3em"}}>&#9679;&#8414;</span>
                  <img src={"assests/images/"+cake.image} class="card-img-top" alt="..."  style={{"height":"100px"}} />
                  <div class="card-body">
                      <h5 class="card-title">{cake.name}</h5>
                      <p class="card-text">{"$"+cake.price}</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                  </div>
                  
            </div>
            );
        })
             
    );
}