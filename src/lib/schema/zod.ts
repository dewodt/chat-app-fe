import { z } from 'zod';

export const signInFormSchema = z.object({
	username: z
		.string()
		.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
			message: 'Username must contain only letters, numbers, and underscores'
		})
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(20, { message: 'Username must be at most 20 characters long' }),
	password: z.string().min(1, { message: 'Password must not be empty' })
});

export const signUpFormSchema = z.object({
	username: z
		.string()
		.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
			message: 'Username must contain only letters, numbers, and underscores'
		})
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(12, { message: 'Username must be at most 12 characters long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(32, { message: 'Password must be at most 32 characters long' })
		.regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'), {
			message:
				'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
		})
});
