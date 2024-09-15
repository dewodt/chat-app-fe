<script lang="ts">
	import { sendMessageSchema } from '$lib/schemas/send-message';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { SendHorizontal } from 'lucide-svelte';
	import {
		sendMessageService,
		sendStopTypingService,
		sendTypingService,
		updateSendMessageQueryDataInbox,
		updateSendMessageQueryDataMessage,
		type SendMessageError,
		type SendMessageRequestBody,
		type SendMessageSuccessResponseBody
	} from '$lib/services/chats';
	import { selectedChatStore } from '$lib/stores';
	import { createMutation, useQueryClient, type InfiniteData } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '../ui/sonner';
	import { onMount } from 'svelte';

	export let scrollToBottom: () => void;

	let inputRef: HTMLInputElement | undefined;

	const form = superForm(defaults(zod(sendMessageSchema)), {
		SPA: true,
		resetForm: true,
		validators: zod(sendMessageSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				return;
			}

			// stop typing
			clearTimeout(inputTimer);
			stopTyping();

			const chatId = $selectedChatStore!.chatId;
			const { message } = $formData;

			$mutation.mutate({ chatId, message });
		},
		onUpdated: () => {
			// After submit, still focus on input
			inputRef?.focus();
		}
	});

	const { form: formData, enhance } = form;

	// Mutation
	const queryClient = useQueryClient();
	const mutation = createMutation<
		SendMessageSuccessResponseBody,
		SendMessageError,
		SendMessageRequestBody
	>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('An error occurred while sending message');

			const responseBody = await sendMessageService(body);
			return responseBody;
		},
		onSuccess: (response) => {
			// Update inbox query data
			updateSendMessageQueryDataInbox(queryClient, response.data);

			// Update chat message query data
			updateSendMessageQueryDataMessage(queryClient, response.data);

			// Scroll bottom
			scrollToBottom();
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		}
	});

	$: {
		// After mutation success + query data updated, scroll to bottom
		if ($mutation.isSuccess) {
			scrollToBottom();
		}
	}

	// On mount, focus on input
	onMount(() => {
		inputRef?.focus();
	});

	// Send input status
	const typingTimeout = 1500;
	let inputTimer: number | undefined;

	const startTyping = () => {
		// console.log('start');
		sendTypingService({ chatId: $selectedChatStore!.chatId });
	};

	const stopTyping = () => {
		// console.log('stopped');
		sendStopTypingService({ chatId: $selectedChatStore!.chatId });
		inputTimer = undefined;
	};

	const onTyping = () => {
		if (!inputTimer) {
			// Initial start typing
			startTyping();

			inputTimer = setTimeout(stopTyping, typingTimeout);
		} else {
			// Mid typing
			// console.log('mid');
			clearTimeout(inputTimer);
			inputTimer = setTimeout(stopTyping, typingTimeout);
		}
	};
</script>

<form use:enhance class="flex flex-row gap-3.5 border-t bg-muted px-4 py-3.5">
	<!-- Message -->
	<Form.Field {form} name="message" class="flex-auto">
		<Form.Control let:attrs>
			<Input
				placeholder="Type a message"
				class="focus-visible:ring-0 focus-visible:ring-offset-0"
				autocomplete="off"
				bind:value={$formData.message}
				bind:ref={inputRef}
				on:input={onTyping}
				{...attrs}
			/>
		</Form.Control>
	</Form.Field>

	<Form.Button size="icon" class="flex-none" disabled={!$formData.message}>
		<SendHorizontal class="size-5" />
	</Form.Button>
</form>
