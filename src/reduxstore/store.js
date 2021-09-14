import { createStore , applyMiddleware } from "redux";
import {reducer1}   from './reducer';
import { middleware } from "./middleware";
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
var store = createStore(reducer1,applyMiddleware(middleware,sagaMiddleware));
sagaMiddleware.run(mySaga);
export default store;