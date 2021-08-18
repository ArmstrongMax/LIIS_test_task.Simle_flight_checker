import React from "react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import FlightsPage from "./Pages/FlightsPage/FlightsPage";
import {Route, Switch} from "react-router-dom";
import {history} from "./Redux/ReduxStore";
import {ConnectedRouter} from "connected-react-router";
//connecting history, specify the application branches.
const App = () => {
    return <ConnectedRouter history={history}>
        <Switch>
            <Route exact path='/' component={() => <LoginPage/>}/>
            <Route exact path='/flights' component={() => <FlightsPage/>}/>
        </Switch>
    </ConnectedRouter>

}

export default App;
