<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { updateProfileSchema } from '$lib/schemas';
	import { cn } from '$lib/utils/ui';
	import {
		updateProfileDataService,
		type UpdateProfileDataError,
		type UpdateProfileDataFormFields,
		type UpdateProfileDataRequestBody,
		type UpdateProfileDataSuccessResponseBody
	} from '$lib/services/users';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import InputAvatar from '$lib/components/side/update-profile/input-avatar.svelte';
	import type { User } from '$types';
	import LoadingText from '$lib/components/shared/loading-text.svelte';

	// Props
	let className = '';
	export { className as class };

	export let initialProfileData: UpdateProfileDataRequestBody;

	export let isEditProfileOpen: boolean;

	// Form
	const form = superForm(defaults(initialProfileData, zod(updateProfileSchema)), {
		SPA: true,
		validators: zod(updateProfileSchema),
		resetForm: false,
		onUpdate: async ({ form }) => {
			// onUpdate fires when Success or failure https://superforms.rocks/concepts/events
			const jsonData = $formData;
			if (!form.valid) {
				return;
			}

			// Valid
			$mutation.mutate(jsonData);
		}
	});
	const { form: formData, enhance, errors, tainted, isTainted } = form;
	let isUploadingImage = false;

	// Mutation
	const queryClient = useQueryClient();
	const mutation = createMutation<
		UpdateProfileDataSuccessResponseBody,
		UpdateProfileDataError,
		UpdateProfileDataRequestBody
	>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 2500));
			// throw new Error('Error');

			const responseBody = await updateProfileDataService(body);
			return responseBody;
		},
		onMutate() {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we update your profile.');
		},
		onSuccess: (response) => {
			// Success Toast
			ToastResponseFactory.createSuccess(response.message);

			// Update query data
			queryClient.setQueryData<User>(['profile-data'], response.data);

			// Callback
			isEditProfileOpen = false;
		},
		onError: (error) => {
			// Error Toast
			ToastResponseFactory.createError(error);

			// Error fields
			if (error.response && error.response.data.errorFields) {
				error.response.data.errorFields.forEach((ef) => {
					// $errors is a writable store
					$errors[ef.field as UpdateProfileDataFormFields] = [ef.message];
				});
			}
		}
	});
</script>

<form method="POST" use:enhance class={cn('space-y-4', className)}>
	<!-- Avatar -->
	<Form.Field {form} name="avatarUrl">
		<Form.Control let:attrs>
			<Form.Label>Avatar</Form.Label>
			<InputAvatar
				bind:avatarUrl={$formData.avatarUrl}
				bind:isSubmitting={$mutation.isPending}
				bind:isUploadingImage
				bind:inputAvatarError={$errors.avatarUrl}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Name -->
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input
				placeholder="Name"
				{...attrs}
				bind:value={$formData.name}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

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

	<!-- About Status -->
	<Form.Field {form} name="about">
		<Form.Control let:attrs>
			<Form.Label>About</Form.Label>
			<Input
				placeholder="About"
				{...attrs}
				bind:value={$formData.about}
				disabled={$mutation.isPending}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Submit -->
	<Form.Button
		class="w-full"
		disabled={!isTainted($tainted) || isUploadingImage || $mutation.isPending}
	>
		{#if $mutation.isPending}
			<LoadingText />
		{:else}
			<span>Save Changes</span>
		{/if}
	</Form.Button>
</form>
