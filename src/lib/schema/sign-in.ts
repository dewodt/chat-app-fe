import { z } from 'zod';

export const signInFormSchema = z.object({
	username: z
		.string({ message: 'Username must not be empty' })
		.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
			message: 'Username must contain only letters, numbers, and underscores'
		})
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(20, { message: 'Username must be at most 20 characters long' }),
	password: z
		.string({ message: 'Password must not be empty' })
		.min(1, { message: 'Password must not be empty' })
});
