<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInFormSchema } from '$lib/schema';
	import {
		type SignInRequestBody,
		type SignInSuccessResponse,
		type SignInErrorResponse,
		type SignInFormFields,
		signInService
	} from '$lib/services';
	import { createMutation } from '@tanstack/svelte-query';
	import { AxiosError } from 'axios';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let initialFormState: SuperValidated<SignInRequestBody>;

	const form = superForm(initialFormState, {
		SPA: true,
		resetForm: false,
		validators: zodClient(signInFormSchema),
		onUpdate: async ({ form }) => {
			// onUpdate fires when Success or failure https://superforms.rocks/concepts/events
			// Invalid
			if (!form.valid) {
				return;
			}

			// Valid
			const jsonData = $formData;
			$mutation.mutate(jsonData);
		}
	});

	const { form: formData, enhance, errors } = form;

	// Mutation
	const mutation = createMutation<SignInSuccessResponse, SignInErrorResponse, SignInRequestBody>({
		mutationFn: signInService,
		onSuccess: (response) => {
			// Success toast
			toast.success('Sign in successfull!', {
				description: response.message,
				duration: 5000
			});

			// Redirect to home
			goto('/');
		},
		onError: (error) => {
			// Error toast
			if (error instanceof AxiosError && error.response) {
				toast.error('Sign in failed!', {
					description: error.response.data.message,
					duration: 5000
				});

				// Error fields
				const errorFields = error.response.data.errorFields;
				if (errorFields) {
					errorFields.forEach((ef) => {
						// $errors is a writable store
						$errors[ef.field as SignInFormFields] = [ef.message];
					});
				}
			} else {
				toast.error('Sign in failed!', {
					description: 'An error occurred while signing in.',
					duration: 5000
				});
			}
		}
	});
</script>

<form method="POST" use:enhance class="space-y-5">
	<!-- Username -->
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input
				placeholder="Username"
				{...attrs}
				bind:value={$formData.username}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Password -->
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				placeholder="Password"
				type="password"
				{...attrs}
				bind:value={$formData.password}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Sign In -->
	<Form.Button class="w-full" disabled={$mutation.isPending}>Sign In</Form.Button>

	<!-- Already have -->
	<p class="text-center text-sm font-medium">
		Don't have an account?
		<a href="/auth/sign-up" class="text-primary hover:underline hover:underline-offset-4">
			Sign up
		</a>
	</p>
</form>
