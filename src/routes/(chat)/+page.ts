import { securitySchema } from '$lib/schema';
import type { PageLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageLoad = async () => {
	// Initial security form state
	const securityForm = await superValidate(zod(securitySchema));

	return { securityForm };
};
