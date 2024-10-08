<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { securitySchema } from '$lib/schemas';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils/ui';
	import {
		updateSecurityService,
		type UpdateSecurityError,
		type UpdateSecurityFormFields,
		type UpdateSecurityRequestBody,
		type UpdateSecuritySuccessResponseBody
	} from '$lib/services/auth';
	import { createMutation } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '$lib/components/ui/sonner/toast-factory';
	import LoadingText from '$lib/components/shared/loading-text.svelte';

	// Props
	let className = '';
	export { className as class };
	export let isSecurityOpen: boolean;

	// Form
	const form = superForm(defaults(zod(securitySchema)), {
		SPA: true,
		validators: zod(securitySchema),
		resetForm: false,
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
	const mutation = createMutation<
		UpdateSecuritySuccessResponseBody,
		UpdateSecurityError,
		UpdateSecurityRequestBody
	>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Error');
			const responseBody = await updateSecurityService(body);
			return responseBody;
		},
		onMutate() {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we change your password.');
		},
		onSuccess: (response) => {
			// Success Toast
			ToastResponseFactory.createSuccess(response.message);

			isSecurityOpen = false;
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);

			// Error fields
			if (error.response && error.response.data.errorFields) {
				error.response.data.errorFields.forEach((ef) => {
					// $errors is a writable store
					$errors[ef.field as UpdateSecurityFormFields] = [ef.message];
				});
			}
		}
	});
</script>

<form method="POST" use:enhance class={cn('space-y-4', className)}>
	<!-- Current Password -->
	<Form.Field {form} name="currentPassword">
		<Form.Control let:attrs>
			<Form.Label>Current Password</Form.Label>
			<Input
				placeholder="Current Password"
				type="password"
				{...attrs}
				bind:value={$formData.currentPassword}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- New Password -->
	<Form.Field {form} name="newPassword">
		<Form.Control let:attrs>
			<Form.Label>New Password</Form.Label>
			<Input
				placeholder="New Password"
				type="password"
				{...attrs}
				bind:value={$formData.newPassword}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Confirm Password -->
	<Form.Field {form} name="confirmNewPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input
				placeholder="Confirm Password"
				type="password"
				{...attrs}
				bind:value={$formData.confirmNewPassword}
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
			<span>Change Password</span>
		{/if}
	</Form.Button>
</form>
