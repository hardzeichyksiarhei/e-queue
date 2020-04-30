import * as actions from '../actions/authActions'

export const initialState = {
    authUser: null,
    token: null,
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
                authUser: action.payload.user,
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
                authUser: null,
                token: null,
                loading: false
            };
        default:
            return state
    }
}
