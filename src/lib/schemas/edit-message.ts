import { z } from 'zod';

export const editMessageSchema = z.object({
	message: z
		.string({ message: 'Message must not be empty' })
		.min(1, { message: 'Message must not be empty' })
});
