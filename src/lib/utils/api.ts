import { goto } from '$app/navigation';
import { PUBLIC_BE_URL } from '$env/static/public';
import axios from 'axios';

export const api = axios.create({
	baseURL: PUBLIC_BE_URL,
	withCredentials: true
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) {
			goto('/auth/sign-in');
		}
		return Promise.reject(error);
	}
);
