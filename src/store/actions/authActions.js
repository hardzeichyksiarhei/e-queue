import { userServices } from '../../services';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

export const loginRequest = () => ({ type: LOGIN_REQUEST })

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
})

export const loginFailure = () => ({ type: LOGIN_FAILURE })

export const logoutRequest = () => ({ type: LOGOUT_REQUEST })

export function login(username, password) {
  return async dispatch => {
    dispatch(loginRequest())

    try {
      const data = await userServices.login(username, password)

      dispatch(loginSuccess({
        user: { login: username },
        token: data.access_token
      }))
    } catch (e) {
      dispatch(loginFailure())
    }
  }
}

export function logout() {
  return async dispatch => {
    await userServices.logout()
    dispatch(logoutRequest())
  }
}

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST })

export const fetchUserSuccess = payload => ({
  type: FETCH_USER_SUCCESS,
  payload,
})

export const fetchUserFailure = () => ({ type: FETCH_USER_FAILURE })

export function fetchUser() {
  return async dispatch => {
    dispatch(fetchUserRequest())

    try {
      const user = await userServices.fetchUser();
      dispatch(fetchUserSuccess(user));
    } catch (e) {
      dispatch(fetchUserFailure());
    }
  }
}
