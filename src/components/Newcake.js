import { Link, withRouter } from "react-router-dom";
function Newcake(props){
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
        <h1 style={{'marginLeft':"160px"}}>{cake.name}</h1>
        <div className="container mt-5" style={{"width":"1100px"}}>
   <div className="row justify-content-md-center" style={{'marginLeft':"160px"}}>
      <div className="col-md-12">
         <div className="card">
            <div className="card-body">
               <div className="container">
                  <div className="row">
                     <div className="col">
                     <img className="img-thumbnail" alt="..." src="https://res.cloudinary.com/ashudev/image/upload/v1623225127/ok6edwgmidrpaojiexg8.jpg"/></div>
                     <div className="col-6">
                        <div className="card" style={{"border":"none"}}>
                           <div className="card-body">
                              <h4 className="card-title">{cake.name}</h4>
                              <h5><span className="">{cake.price}</span></h5>
                              <p className="card-text">{cake.desc}</p>
                              <table className="table">
                                 <tbody>
                                    <tr>
                                       <th scope="row">Likes</th>
                                       <td>10</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Ratings</th>
                                       <td>4.5</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Type</th>
                                       <td>General</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Flavour</th>
                                       <td>Chocolate</td>
                                    </tr>
                                    <tr>
                                       <th scope="row">Weight</th>
                                       <td>1 Kg</td>
                                    </tr>
                                 </tbody>
                              </table>
                              <p>
                              <button type="button" class="btn btn-success">Add To Cart</button>
                              </p>
                           </div>
                        </div>
                     </div>
                     
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>     


              
        </div> 
             
    )
}

export default withRouter(Newcake);