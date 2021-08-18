import {delay, put, select, takeEvery} from "@redux-saga/core/effects";
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILURE,
    LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST,
    LOGOUT_REQUEST_SUCCESS
} from "../Redux/AuthReducer";
import {push} from 'connected-react-router'
//The saga of authorization logic

/*
The user authorization saga.
Accepts a username and password via payload.
Creates a delay to simulate an asynchronous operation.
If the username and password match the values from state,
it sends a success action with the installation of the authorization flag in the local storage and redirects the user.
If the data is incorrect, then an failure action and error message.
The logout resets the authorization and redirects to the main page
*/
export function* loginRequest({payload}) {
    const login = yield select(state => state.auth.login)
    const password = yield select(state => state.auth.password)
    yield delay(1000)
    if (payload.login === login && payload.password === password) {
        yield put({type: LOGIN_REQUEST_SUCCESS, payload: login})
        yield localStorage.setItem('isAuthorized', 'true')
        yield put(push('/flights'))
    } else yield put({type: LOGIN_REQUEST_FAILURE, payload: 'Неверный почтовый адрес или пароль'})
}

export function* logoutRequest() {
    yield delay(1000)
    yield put({type: LOGOUT_REQUEST_SUCCESS})
    yield localStorage.removeItem('isAuthorized')
    yield put(push('/'))
}

export function* authSaga() {
    yield takeEvery(LOGIN_REQUEST, loginRequest)
    yield takeEvery(LOGOUT_REQUEST, logoutRequest)
}