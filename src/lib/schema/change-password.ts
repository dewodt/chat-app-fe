import { z } from 'zod';

export const changePasswordFormSchema = z
	.object({
		oldPassword: z
			.string({ message: 'Password must not be empty' })
			.min(1, { message: 'Password must not be empty' }),
		newPassword: z
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
		confirmNewPassword: z
			.string({ message: 'Password must not be empty' })
			.min(1, { message: 'Password must not be empty' })
	})
	.superRefine((data, ctx) => {
		if (data.newPassword !== data.confirmNewPassword) {
			return ctx.addIssue({
				code: 'custom',
				message: 'Password confirmation do not match',
				path: ['confirmNewPassword']
			});
		}
	});
