<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createMutation } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import LoadingText from '$lib/components/shared/loading-text.svelte';
	import { editMessageSchema } from '$lib/schemas/edit-message';
	import type { Message } from '$types';
	import { cn } from '$lib/utils/ui';

	// Props
	let className = '';
	export { className as class };
	export let initialMessage: Message;
	export let isEditOpen: boolean;
	console.log(isEditOpen);

	const form = superForm(
		defaults(zod(editMessageSchema), {
			defaults: {
				message: initialMessage.content
			}
		}),
		{
			SPA: true,
			resetForm: false,
			validators: zod(editMessageSchema),
			onUpdate: async ({ form }) => {
				// onUpdate fires when Success or failure https://superforms.rocks/concepts/events
				// Invalid
				if (!form.valid) {
					return;
				}

				// Valid
				const jsonData = $formData;
				// $mutation.mutate(jsonData);
			}
		}
	);

	const { form: formData, enhance, errors } = form;

	// // Mutation
	// const mutation = createMutation<SignInSuccessResponseBody, SignInError, SignInRequestBody>({
	// 	mutationFn: async (body) => {
	// 		// await new Promise((resolve) => setTimeout(resolve, 5000));
	// 		// throw new Error('Error');
	// 		const responseBody = await signInService(body);
	// 		return responseBody;
	// 	},
	// 	onMutate: () => {
	// 		// Loading toast
	// 		ToastResponseFactory.createLoading('Please wait while we sign you in.');
	// 	},
	// 	onSuccess: (response) => {
	// 		// Success toast
	// 		ToastResponseFactory.createSuccess(response.message);

	// 		// Redirect to home
	// 		goto('/');
	// 	},
	// 	onError: (error) => {
	// 		// Error toast
	// 		ToastResponseFactory.createError(error);

	// 		// Error fields
	// 		if (error.response && error.response.data.errorFields) {
	// 			error.response.data.errorFields.forEach((ef) => {
	// 				// $errors is a writable store
	// 				$errors[ef.field as SignInFormFields] = [ef.message];
	// 			});
	// 		}
	// 	}
	// });
</script>

<form use:enhance class={cn('space-y-5', className)}>
	<!-- Message -->
	<Form.Field {form} name="message">
		<Form.Control let:attrs>
			<Form.Label>New Message</Form.Label>
			<Input
				placeholder="New message"
				autocomplete="off"
				bind:value={$formData.message}
				{...attrs}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Sign In -->
	<Form.Button class="w-full">
		<!-- {#if $mutation.isPending}
			<LoadingText />
		{:else}
			<span>Edit</span>
		{/if} -->
		<span>Edit</span>
	</Form.Button>
</form>
