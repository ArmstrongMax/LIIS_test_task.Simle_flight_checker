import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import authReducer from './AuthReducer';
import flightsReducer from "./FlightsReducer";
import rootSaga from "../Sagas/RootSaga";
import {routerMiddleware} from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'
import {createBrowserHistory} from 'history'
import {connectRouter} from "connected-react-router";

/*Create a history object, saga middleware,
combine all redusers together with history,
connect redux devtools, run the root saga*/

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    flights: flightsReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store;