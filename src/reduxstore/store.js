import { createStore , applyMiddleware } from "redux";
import {reducer1}   from './reducer';
import { middleware } from "./middleware";
var store = createStore(reducer1,applyMiddleware(middleware));

export default store;