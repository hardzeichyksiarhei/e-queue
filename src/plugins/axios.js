import axios from 'axios';

import store from './../store';

// Request interceptor
axios.interceptors.request.use(request => {
    const { auth: { token } } = store.getState();
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request;
})