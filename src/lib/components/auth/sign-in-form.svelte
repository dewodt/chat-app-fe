<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { signInFormSchema } from '$lib/schemas';
	import {
		type SignInRequestBody,
		type SignInSuccessResponseBody,
		type SignInError,
		type SignInFormFields,
		signInService
	} from '$lib/services/auth';
	import { createMutation } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import LoadingText from '$lib/components/shared/loading-text.svelte';

	const form = superForm(defaults(zod(signInFormSchema)), {
		SPA: true,
		resetForm: false,
		validators: zod(signInFormSchema),
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
	const mutation = createMutation<SignInSuccessResponseBody, SignInError, SignInRequestBody>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Error');

			const responseBody = await signInService(body);
			return responseBody;
		},
		onMutate: () => {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we sign you in.');
		},
		onSuccess: (response) => {
			// Success toast
			ToastResponseFactory.createSuccess(response.message);

			// Redirect to home
			goto('/');
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);

			// Error fields
			if (error.response && error.response.data.errorFields) {
				error.response.data.errorFields.forEach((ef) => {
					// $errors is a writable store
					$errors[ef.field as SignInFormFields] = [ef.message];
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
	<Form.Button class="w-full" disabled={$mutation.isPending}>
		{#if $mutation.isPending}
			<LoadingText />
		{:else}
			<span>Sign In</span>
		{/if}
	</Form.Button>

	<!-- Already have -->
	<p class="text-center text-sm font-medium">
		Don't have an account?
		<a href="/auth/sign-up" class="text-primary hover:underline hover:underline-offset-4">
			Sign up
		</a>
	</p>
</form>
