<script lang="ts">
	import Side from '$lib/components/side/side.svelte';
	import HeadTemplate from '$lib/components/shared/head-template.svelte';
	import { selectedChatStore } from '$lib/stores';
	import ChatDetail from '$lib/components/chat/chat-detail.svelte';
	import ChatEmpty from '$lib/components/chat/chat-empty.svelte';
	import { mediaQuery } from 'svelte-legos';
	import { listenEvent } from '$lib/utils/socket-io';
	import {
		readChatService,
		updateDeleteMessageQueryDataInbox,
		updateDeleteMessageQueryDataMessage,
		updateEditMessageQueryDataInbox,
		updateEditMessageQueryDataMessage,
		updateReadChatQueryDataInbox,
		updateReadChatQueryDataMessage,
		updateSendMessageQueryDataInbox,
		updateSendMessageQueryDataMessage,
		type DeleteMessageSuccessResponseBody,
		type EditMessageSuccessResponseBody,
		type ReadChatError,
		type ReadChatRequestBody,
		type ReadChatSuccessResponseBody,
		type SendMessageSuccessResponseBody
	} from '$lib/services/chats';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';

	const isDesktop = mediaQuery('(min-width: 1024px)');

	// Read chat mutation
	const queryClient = useQueryClient();
	const mutation = createMutation<ReadChatSuccessResponseBody, ReadChatError, ReadChatRequestBody>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('An error occurred while reading chat');

			const responseBody = await readChatService(body);
			return responseBody;
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		},
		onSuccess: (response) => {
			// Inbox query data
			updateReadChatQueryDataInbox(queryClient, response.data);

			// Messages query data
			updateReadChatQueryDataMessage(queryClient, response.data);
		}
	});

	// Listen to new message from other user
	listenEvent<SendMessageSuccessResponseBody>('newMessage', (response) => {
		// Update inbox query data
		updateSendMessageQueryDataInbox(queryClient, response.data);

		// Update chat message query data
		updateSendMessageQueryDataMessage(queryClient, response.data);

		// Update read receipt if chat is currently open
		if ($selectedChatStore && $selectedChatStore.chatId === response.data.chatInbox.chatId) {
			$mutation.mutate({ chatId: response.data.chatInbox.chatId });
		}
	});

	// Listen to edited message from other user
	listenEvent<EditMessageSuccessResponseBody>('newEditMessage', (response) => {
		// Update inbox query data
		updateEditMessageQueryDataInbox(queryClient, response.data);

		// Update chat message query data
		updateEditMessageQueryDataMessage(queryClient, response.data);
	});

	// Listen to deleted message from other user
	listenEvent<DeleteMessageSuccessResponseBody>('newDeleteMessage', (response) => {
		// Update inbox query data
		updateDeleteMessageQueryDataInbox(queryClient, response.data);

		// Update chat message query data
		updateDeleteMessageQueryDataMessage(queryClient, response.data);
	});

	// Listen to read chats from other user
	listenEvent<ReadChatSuccessResponseBody>('newReadChat', (response) => {
		// Update chat message only (inbox is not updated)
		updateReadChatQueryDataMessage(queryClient, response.data);
	});
</script>

<HeadTemplate
	title="Chat App"
	description="Chat App is a simple chat application that allows you to chat with your friends."
/>

<!-- Side -->
{#if $isDesktop || (!$isDesktop && !$selectedChatStore)}
	<Side />
{/if}

<!-- Chat Detail -->
{#if $isDesktop && !$selectedChatStore}
	<ChatEmpty />
{:else if $selectedChatStore}
	{#key $selectedChatStore.chatId}
		<ChatDetail />
	{/key}
{/if}
