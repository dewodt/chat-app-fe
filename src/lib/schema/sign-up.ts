import { z } from 'zod';

export const signUpFormSchema = z
	.object({
		username: z
			.string({ message: 'Username must not be empty' })
			.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
				message: 'Username must contain only letters, numbers, and underscores'
			})
			.min(3, { message: 'Username must be at least 3 characters long' })
			.max(12, { message: 'Username must be at most 12 characters long' }),
		password: z
			.string({ message: 'Password must not be empty' })
			.min(8, { message: 'Password must be at least 8 characters long' })
			.max(32, { message: 'Password must be at most 32 characters long' })
			.regex(new RegExp('^(?=.*[a-z])'), {
				message: 'Password must contain a lowercase'
			})
			.regex(new RegExp('^(?=.*[A-Z])'), {
				message: 'Password must contain an uppercase'
			})
			.regex(new RegExp('^(?=.*[0-9])'), {
				message: 'Password must contain a number'
			})
			.regex(new RegExp('^(?=.*[!@#$%^&*])'), {
				message: 'Password must contain a special character'
			}),
		confirmPassword: z
			.string({ message: 'Password must not be empty' })
			.min(1, { message: 'Password must not be empty' })
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			return ctx.addIssue({
				code: 'custom',
				message: 'Password confirmation do not match',
				path: ['confirmPassword']
			});
		}
	});
