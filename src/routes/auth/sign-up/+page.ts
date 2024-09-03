import { signUpFormSchema } from '$lib/schema';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageLoad = async () => {
	// Initial form state
	const form = await superValidate(zod(signUpFormSchema));

	return { form };
};
