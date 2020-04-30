import * as actions from '../actions/authActions'

export const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    hasErrors: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.LOGIN_SUCCESS:
            return {
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                hasErrors: false
            };
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true
            };
        case actions.LOGOUT_REQUEST:
            return {
                user: null,
                token: null,
                loading: false
            };


        case actions.FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                hasErrors: false
            };
        case actions.FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                hasErrors: true
            };
        default:
            return state
    }
}
