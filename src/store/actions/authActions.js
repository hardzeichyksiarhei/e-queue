import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

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
        const { data, status } = await axios.post('https://equeue-bspu.herokuapp.com/admin/login', { username, password })

        if (status === 200 && data.access_token) {
            localStorage.setItem('token', data.access_token);

            dispatch(loginSuccess({
                user: { login: username },
                token: data.access_token
            }))
        }
    } catch(e)  {
      dispatch(loginFailure())
    }
  }
}

export function logout() {
  return async dispatch => {
    localStorage.removeItem('token');
    dispatch(logoutRequest())
  }
}
