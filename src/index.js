import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewApp from './components/NewApp';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './reduxstore/store';
import store from './reduxstore/store';
import { Provider } from 'react-redux';


axios.interceptors.request.use(
  (request)=>{
    console.log('latest');
    console.log(request.url);
    if(request.url.includes('add-to-cart') || request.url.includes('cart')){
      if(localStorage.getItem('token')){
        request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      }else{
        window.location.href = '/signin';
      }
      return request;
    }else{
      return request;
    }
  },
  (error)=>{
    console.log('---------In Error from interceptors');
  return Promise.reject();
})

ReactDOM.render(
  <React.StrictMode>
     <ToastContainer 
     />
     <Provider store={store}>
    <NewApp/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
