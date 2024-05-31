import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function setToken(token: string) {
    return cookies.set('access_token', token);
}

export function getAccessToken() {
    return cookies.get('access_token');
}

export function isLoggedIn() {
    return cookies.get('access_token');
}

export function removeToken() {
    cookies.remove('access_token', { path: '/' });
}