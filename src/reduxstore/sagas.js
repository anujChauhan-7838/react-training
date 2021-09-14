import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from "react-toastify";

function generateOrderAPi(payload){
       return axios({
        method:"post",
        url:process.env.REACT_APP_BASEURL+"/auth/generate-order",
        url:"http://localhost:8000/auth/generate-order",
        data:payload
      });
}
function* generateOrder(action) {
    var res = yield call(generateOrderAPi,action.payload);
    if(res.data.status == 1){
        yield put({type:'SAVEORDERID',payload:res.data.orderId});
    }

 }



export default function* mySaga() {
    yield takeLatest("GENERATE_ORDER", generateOrder);
  }

