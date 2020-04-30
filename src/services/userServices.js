import axios from 'axios';

export const userServices = {
    login,
    logout
};

async function login(username, password) {
    try {
        const { data, status } = await axios.post('https://equeue-bspu.herokuapp.com/admin/login', { username, password })

        console.log(data);

        if (status === 200 && data.access_token) {
            localStorage.setItem('token', data.access_token);
            return data;
        }
    } catch (e) { throw e; }
}

async function logout() {
    localStorage.removeItem('token');
}