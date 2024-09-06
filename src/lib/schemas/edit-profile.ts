import { allowedImageHosts, allowedImagesTypes, maxImageSize } from '$lib/constants/bucket';
import { z } from 'zod';

// Avatar Schema
export const avatarSchema = z
	.custom<File>()
	.refine((file) => {
		return file.size <= maxImageSize;
	}, `File size should be less than 5 MB`)
	.refine((file) => {
		return allowedImagesTypes.includes(file.type);
	}, 'Only these types are allowed .jpg, .jpeg, .png and .webp');

// Edit Profile Schema
export const updateProfileSchema = z.object({
	username: z
		.string({ message: 'Username must not be empty' })
		.regex(new RegExp('^[a-z0-9_]*$'), {
			message: 'Username must contain only lower case letters, numbers, and underscores'
		})
		.min(3, { message: 'Username must be at least 3 characters long' })
		.max(20, { message: 'Username must be at most 20 characters long' }),

	name: z
		.string({ message: 'Name must not be empty' })
		.min(1, { message: 'Name must not be empty' })
		.max(50, { message: 'Name must be at most 50 characters long' }),

	about: z
		.string({ message: 'About must be a string' })
		.min(1, 'About must not be empty')
		.max(140, 'About must be at most 140 characters'),

	avatarUrl: z
		.string({ message: 'Avatar URL must be a string' })
		.url('Invalid URL')
		.refine((str) => allowedImageHosts.some((host) => str.startsWith(host)), 'Invalid host URL')
		.nullable()
});
