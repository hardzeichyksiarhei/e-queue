import axios from 'axios';

export const userServices = {
    login,
    logout,
    fetchUser,
    fetchNunmberOfUsers,
    fetchNunmberOfUsersByDay
};

async function login(username, password) {
    try {
        const { data, status } = await axios.post('https://equeue-bspu.herokuapp.com/admin/login', { username, password })

        if (status === 200 && data.access_token) {
            localStorage.setItem('token', data.access_token);
            return data;
        }
    } catch (e) { throw e; }
}

async function logout() {
    localStorage.removeItem('token');
}

async function fetchUser() {
    try {
        const { data, status } = await axios.get('https://equeue-bspu.herokuapp.com/admin/user')
        return status === 200 ? data : null;
    } catch (e) { throw e; }
}

async function fetchNunmberOfUsersByDay(date) {
    try {
        const { data, status } = await axios.get(`https://equeue-bspu.herokuapp.com/admin/stats/day?date=${date}`);
        return status === 200 ? data : null;
    } catch (e) { throw e; }
}

async function fetchNunmberOfUsers() {
    try {
        const { data, status } = await axios.get(`https://equeue-bspu.herokuapp.com/admin/stats/all`);
        return status === 200 ? data : null;
    } catch (e) { throw e; }
}