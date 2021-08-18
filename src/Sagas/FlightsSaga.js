import {api} from "../API/API";
import {fork, put, select, take, takeEvery} from "@redux-saga/core/effects";
import {LOAD_FLIGHTS, LOAD_FLIGHTS_SUCCESS, SET_DATE} from "../Redux/FlightsReducer";
import {LOCATION_CHANGE} from "connected-react-router";

/*The saga of requesting flights.
There is a general data request worker and an additional watcher for the request when entering the flight page.
Variation of the request from componentDidMount using connected-react-router and history*/

export function* getFlightsList({payload}) {
    const isSomeoneAuthorized = yield select((state => state.auth.isSomeoneAuthorized))
    let date
    payload !== 'anytime' ? date = payload.toISOString().split('T')[0] : date = payload
    if (isSomeoneAuthorized) {
        const data = yield api.getFlights(date)
        yield put({type: LOAD_FLIGHTS_SUCCESS, payload: data})
    }
}

export function* getFlightsOnFirstEntry() {
    while (true) {
        const action = yield take(LOCATION_CHANGE)
        if (action.payload.location.pathname.endsWith('flights')) {
            const state = yield select(state => state.flights)
            const {date} = state
            yield put({type: LOAD_FLIGHTS, payload: date})
        }
    }
}

export function* flightsSaga() {
    yield takeEvery(LOAD_FLIGHTS, getFlightsList)
    yield takeEvery(SET_DATE, getFlightsList)
    yield fork(getFlightsOnFirstEntry)
}