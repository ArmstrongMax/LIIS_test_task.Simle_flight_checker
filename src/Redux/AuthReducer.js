export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS'
export const LOGIN_REQUEST_FAILURE = 'LOGIN_REQUEST_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'

/*Since the skyscanner API does not provide an endpoint for authorization,
the username and password are hardcoded into the store.
The value of isSomeoneAuthorized is taken from local storage,
here is a flag for showing the fetching icon (didn't have time to implement it) and an authorization error message.*/

const initialState = {
    login:'testacc@mail.ru',
    password:'TestAcc1234&',
    isSomeoneAuthorized:!!localStorage.getItem('isAuthorized'),
    isLoading:false,
    errorMessage:null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:{
            return {...state, isLoading: true}
        }
        case LOGIN_REQUEST_SUCCESS :{
            return {...state, isLoading: false, isSomeoneAuthorized: action.payload, errorMessage: null}
        }
        case LOGIN_REQUEST_FAILURE :{
            return {...state, isLoading: false, errorMessage: action.payload}
        }
        case LOGOUT_REQUEST_SUCCESS :{
            return {...state, isLoading: false, isSomeoneAuthorized: false, errorMessage: null}
        }
        default:
            return state;
    }
}

export default authReducer;