import {all, spawn} from "@redux-saga/core/effects";
import {flightsSaga} from "./FlightsSaga";
import {authSaga} from "./AuthSaga";
//The root saga that runs all domain sagas
export default function* rootSaga() {
    const sagas = [flightsSaga, authSaga]
    yield all(sagas.map(s => spawn(s)))
}

