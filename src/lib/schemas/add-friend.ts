import { z } from 'zod';

export const addFriendSchema = z.object({
	username: z
		.string({ message: 'Username must not be empty' })
		.min(1, { message: 'Username must not be empty' })
});
