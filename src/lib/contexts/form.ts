import type { SecurityRequestBody } from '$lib/services/auth';
import type { SuperValidated } from 'sveltekit-superforms';

export const securityFormContextKey = Symbol();

export type SecurityFormContextValue = SuperValidated<SecurityRequestBody>;
