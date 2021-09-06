import axios from 'axios';

export var middleware = function(state){
    return function(next){
        return function(action){
            console.log('----middleware--------');
            console.log(localStorage.token);
            console.log(action.type);
           if(localStorage.token && action.type == 'GETCHECKOUTCOUNT'){
            axios({
                        method:"get",
                        url:process.env.REACT_APP_BASEURL+"/auth/get-cart-products"
                    }).then(function(response){
                      next({
                        type:'UPDATECHECKOUTCOUNT',
                        'cartCount':response.data.data.length
                      })
                          
                    }).catch(function(error){
                      next({
                        type:'GETCHECKOUTCOUNT',
                      })   
                        
                    });
           }else{
               next(action);
           }
        }
    }
}