import axios from 'axios';
export function reducer1(state={
     isLoggedIn:typeof localStorage.getItem('token') != 'undefined' && localStorage.getItem('token') != null,
     cartItem:0,
     paymentOrderId:0
},action){
     switch(action.type){
       case 'SIGNIN':{
            state = {...state}
            state.isLoggedIn = true;
            return state;
       }
       case 'CHECKLOGIN':{
          state = {...state}
          return state;
     }
     case 'LOGOUT':{
          state = {...state}
          state.isLoggedIn = false;
          return state;
     }
     case 'UPDATECHECKOUTCOUNT':{
          state = {...state}
          state.cartItem = action.cartCount
          return state;
     }
     case 'GETCHECKOUTCOUNT':{
               state = {...state}
               return state;
     }
     case 'DESCCARTCOUNT':{
          state = {...state}
          state.cartItem = state.cartItem-1;
          return state;
     }
     case 'SAVEORDERID':{
          state = {...state}
          state.paymentOrderId = action.payload;
          return state;
     }

     case 'GETORDERID':{
          state = {...state}
          return state;
     }
     
       default: return state
     }
}