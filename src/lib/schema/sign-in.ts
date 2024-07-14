import { z } from 'zod';

export const signInFormSchema = z.object({
	username: z
		.string({ message: 'Username must not be empty' })
		.min(1, { message: 'Username must not be empty' }),
	password: z
		.string({ message: 'Password must not be empty' })
		.min(1, { message: 'Password must not be empty' })
});
