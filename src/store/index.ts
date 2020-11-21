import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk"
import globalReducer from "./global";
import homeReducer from "../pages/Home/flow";
import { IStoreState } from "./shared";

const reducers = combineReducers<IStoreState>({
  global: globalReducer,
  homePage: homeReducer,
});

const createMyStore = () => {
  const store = process.env.REACT_APP_RUN_MODE === "production" ? (
    createStore(reducers, applyMiddleware(thunk))
  ) : (
    window.__REDUX_DEVTOOLS_EXTENSION__? (
      createStore(reducers, compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__({})))
    ) : (
      createStore(reducers, applyMiddleware(thunk, logger))
    )
  );
  return store;
}

export default createMyStore;
