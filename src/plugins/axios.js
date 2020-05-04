import axios from 'axios';
import { logout } from './../store/actions/authActions'

import store from './../store';
import { history } from './../index';

// Request interceptor
axios.interceptors.request.use(request => {
    const { auth: { token } } = store.getState();
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { dispatch } = store;
    if (401 === error.response.status || 422 === error.response.status) {
        history.push({
            pathname: '/login',
            state: { sessionExpired: true }
        });
        dispatch(logout());
    } else {
        return Promise.reject(error);
    }
});