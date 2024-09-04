import type { ErrorResponseDto } from '$types';
import { AxiosError } from 'axios';
import { toast } from 'svelte-sonner';

export class ToastResponseFactory {
	static createLoading(message: string): void {
		toast.dismiss();

		toast.loading('Loading...', {
			duration: Infinity,
			description: message
		});
	}

	static createSuccess(message: string): void {
		toast.dismiss();

		toast.success('Success', {
			duration: 5000,
			description: message
		});
	}

	static createError(error: AxiosError<ErrorResponseDto>): void {
		toast.dismiss();

		if (error instanceof AxiosError && error.response) {
			toast.error(`Error: ${error.response.statusText}`, {
				description: error.response.data.message,
				duration: 5000
			});
		} else {
			toast.error('Error: Internal Server', {
				description: 'An internal server error occurred.',
				duration: 5000
			});
		}
	}
}
