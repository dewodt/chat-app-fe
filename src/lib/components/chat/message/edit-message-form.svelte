<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createMutation, useQueryClient, type InfiniteData } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import LoadingText from '$lib/components/shared/loading-text.svelte';
	import { editMessageSchema } from '$lib/schemas/edit-message';
	import type { Message } from '$types';
	import { cn } from '$lib/utils/ui';
	import {
		updateEditMessageQueryDataInbox,
		updateEditMessageQueryDataMessage,
		editMessageService,
		type EditMessageError,
		type EditMessageRequestBody,
		type EditMessageSuccessResponseBody
	} from '$lib/services/chats';

	// Props
	let className = '';
	export { className as class };
	export let initialMessage: Message & {
		content: NonNullable<Message['content']>;
		deletedAt: null;
	};

	export let isEditOpen: boolean;
	export let isPendingEdit: boolean;
	$: {
		isPendingEdit = $mutation.isPending;
	}

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

				const jsonData = $formData;
				$mutation.mutate({
					messageId: initialMessage.messageId,
					message: jsonData.message
				});
			}
		}
	);

	const { form: formData, enhance, isTainted, tainted } = form;

	// Mutations
	const queryClient = useQueryClient();
	const mutation = createMutation<
		EditMessageSuccessResponseBody,
		EditMessageError,
		EditMessageRequestBody
	>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Error');

			const response = await editMessageService(body);
			return response;
		},
		onMutate: () => {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we edit your message.');
		},
		onSuccess: (response) => {
			// Update inbox
			updateEditMessageQueryDataInbox(queryClient, response.data);

			// Update message
			updateEditMessageQueryDataMessage(queryClient, response.data);

			// Success toast
			ToastResponseFactory.createSuccess(response.message);

			// Close edit popup
			isEditOpen = false;
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		},
		onSettled: () => {
			// todo: investigate why isPending not updated from $mutation when dialog is closed
			isPendingEdit = false; // Case when dialog is closed
		}
	});
</script>

<form use:enhance class={cn('space-y-5', className)}>
	<!-- Message -->
	<Form.Field {form} name="message">
		<Form.Control let:attrs>
			<Form.Label>Edit Message</Form.Label>
			<Input
				placeholder="Edit message"
				autocomplete="off"
				bind:value={$formData.message}
				disabled={$mutation.isPending}
				{...attrs}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<!-- Sign In -->
	<Form.Button class="w-full" disabled={!isTainted($tainted) || $mutation.isPending}>
		{#if $mutation.isPending}
			<LoadingText />
		{:else}
			<span>Edit</span>
		{/if}
	</Form.Button>
</form>
