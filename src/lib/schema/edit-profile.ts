import { allowedImageHosts, allowedImagesTypes, maxImageSize } from '$lib/constants';
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
export const editProfileSchema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
	about: z.string().max(160, 'About must be at most 160 characters').nullable(),
	avatar: z
		.string()
		.url('Invalid URL')
		.refine((str) => allowedImageHosts.some((host) => str.startsWith(host)), 'Invalid host URL')
		.nullable()
});
