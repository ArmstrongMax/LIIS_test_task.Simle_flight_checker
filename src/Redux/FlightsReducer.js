import _ from 'lodash';

export const LOAD_FLIGHTS = 'LOAD_FLIGHTS'
export const LOAD_FLIGHTS_SUCCESS = 'LOAD_FLIGHTS_SUCCESS'
export const LOAD_FLIGHTS_FAILURE = 'LOAD_FLIGHTS_FAILURE'
export const SET_DATE = 'SET_DATE'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'

/*There is an array for all flights,
a fetching flag (didn't have time to implement fetching icons), a date to send with the REST request,
an error field during the request,
an array of flights added to favorites and an array of hardcoded images for the carousel*/

const initialState = {
    flights: [],
    loading: false,
    date: 'anytime',
    error: null,
    favorites: [],
    cityImages: [
        'https://i.pinimg.com/236x/d4/bd/58/d4bd584fb23aa2cdee6ae15d284eecf2--nd-street-main-street.jpg',
        'https://sun9-23.userapi.com/impf/c840325/v840325590/1d897/P-k1hHgwNyE.jpg?size=320x320&quality=96&sign=9c95cbc73299a478b6c6904b0a1fada6&type=album',
        'https://sun1-22.userapi.com/impg/c855524/v855524221/20205a/zs4hSV1CqcY.jpg?size=200x0&quality=88&crop=1,97,766,766&sign=e606eaf29ccaa8d44dbf4bacb9c2b695&c_uniq_tag=5LcGZI3Pst0VtnwJGsb6S014H39Tzbb6Pu23E1SsDrI&ava=1',
        'https://54.img.avito.st/avatar/social/256x256/6008872954.jpg',
        'https://i.pinimg.com/280x280_RS/7d/72/73/7d7273438235c5013e80cef1b907abba.jpg',
        'https://i.pinimg.com/280x280_RS/e8/bb/d5/e8bbd5e6cf03576d37ae079b90a31a61.jpg',
        'https://i.pinimg.com/280x280_RS/a6/5f/d7/a65fd72cb0bceed8b404a3e3423f5b0e.jpg',
        'https://www.color-stickers.com/1456-large_default/tableau-new-york-city-bulding.jpg',
        'https://www.ecdilokulu.com/wp-content/uploads/2018/04/ec-amerika.jpg',
        'https://pbs.twimg.com/profile_images/685859956126429184/eN5Fskh6_400x400.jpg'
    ]
}

const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FLIGHTS:
            return {
                ...state, loading: true, date: action.payload
            }
        case LOAD_FLIGHTS_SUCCESS:
            return {
                ...state, loading: false, flights: action.payload
            }
        case LOAD_FLIGHTS_FAILURE:
            return {
                ...state, loading: false, error: action.payload
            }
        case SET_DATE:
            return {
                ...state, date: action.payload
            }
        case ADD_TO_FAVORITES:
            return {
                ...state, favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FROM_FAVORITES:
            return {
                ...state, favorites: [...state.favorites.filter(item => !(_.isEqual(item, action.payload)))]
            }
        default:
            return state;
    }
}

export default flightsReducer;