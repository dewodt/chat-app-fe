import { PUBLIC_BE_URL } from '$env/static/public';
import axios from 'axios';

console.log(PUBLIC_BE_URL);

export const api = axios.create({
	baseURL: PUBLIC_BE_URL,
	withCredentials: true
});

api.defaults.headers.post['Content-Type'] = 'application/json';
