import { createStore, applyMiddleware } from "redux";
import appReducer from "./reducers";
import appMiddleWare from "./appMiddleWare";

export default createStore(appReducer, applyMiddleware(appMiddleWare));
