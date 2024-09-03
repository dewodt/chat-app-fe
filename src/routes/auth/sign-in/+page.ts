import { signInFormSchema } from '$lib/schema';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageLoad = async () => {
	const form = await superValidate(zod(signInFormSchema));

	return { form };
};
