<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { signUpFormSchema } from '$lib/schema/sign-up.js';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createMutation } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import {
		signUpService,
		type SignUpError,
		type SignUpFormFields,
		type SignUpRequestBody,
		type SignUpSuccessResponseBody
	} from '$lib/services/auth';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import LoadingText from '$lib/components/shared/loading-text.svelte';

	const form = superForm(defaults(zod(signUpFormSchema)), {
		SPA: true,
		resetForm: false,
		validators: zod(signUpFormSchema),
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
	const mutation = createMutation<SignUpSuccessResponseBody, SignUpError, SignUpRequestBody>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Error');
			const responseBody = await signUpService(body);
			return responseBody;
		},
		onMutate: () => {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we sign you in.');
		},
		onSuccess: (response) => {
			// Success toast
			ToastResponseFactory.createSuccess(response.message);

			// Redirect to sign in
			goto('/auth/sign-in');
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);

			// Error fields
			// Error fields
			if (error.response && error.response.data.errorFields) {
				error.response.data.errorFields.forEach((ef) => {
					// $errors is a writable store
					$errors[ef.field as SignUpFormFields] = [ef.message];
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
			<Input placeholder="Username" {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input placeholder="Name" {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Password -->
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input placeholder="Password" type="password" {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Confirm Password -->
	<Form.Field {form} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input
				placeholder="Confirm Password"
				type="password"
				{...attrs}
				bind:value={$formData.confirmPassword}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Sign Up -->
	<Form.Button class="w-full">
		{#if $mutation.isPending}
			<LoadingText />
		{:else}
			<span>Sign Up</span>
		{/if}
	</Form.Button>

	<!-- Already have -->
	<p class="text-center text-sm font-medium">
		Already have an account?
		<a href="/auth/sign-in" class="text-primary hover:underline hover:underline-offset-4">
			Sign in
		</a>
	</p>
</form>
