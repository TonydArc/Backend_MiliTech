import axios from 'axios';
import { getAccessToken } from './untils';
import Cookies from 'universal-cookie';

const API_URL = 'http://127.0.0.1:8000/api/auth/';


export async function register(formdata: {
    'name': string,
    'email': string,
    'password': string,
}) {
    const users = await axios.post(API_URL + 'register', formdata);
    return users;
};

export async function login(formdata: {
    'email': string,
    'password': string,
}) {

    try {
        const users = await axios.post(API_URL + 'login', formdata);
        // if (users.data) {
        //     const token = users.data['access_token'];
        //     setToken(token);
        // }
        return users.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export async function getProfile() {
    const token = getAccessToken();
    try {
        const profile = await axios.get(API_URL + `profile`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        return profile.data.data;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    const token = getAccessToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const user = await axios.post(API_URL + `logout`, null, config);
        const cookies = new Cookies();
        cookies.remove('access_token');
        return user;
    } catch (error) {
        console.log('logout error', error);
    }
};







