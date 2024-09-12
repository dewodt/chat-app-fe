<script lang="ts">
	import Side from '$lib/components/side/side.svelte';
	import HeadTemplate from '$lib/components/shared/head-template.svelte';
	import { selectedChatStore } from '$lib/stores';
	import ChatDetail from '$lib/components/chat/chat-detail.svelte';
	import ChatEmpty from '$lib/components/chat/chat-empty.svelte';
	import { mediaQuery } from 'svelte-legos';
	import { listenEvent } from '$lib/utils/socket-io';
	import {
		deleteChatMessageQueryData,
		editChatMessageQueryData,
		updateSendMessageQueryData,
		type DeleteMessageSuccessResponseBody,
		type EditMessageSuccessResponseBody,
		type SendMessageSuccessResponseBody
	} from '$lib/services/chats';
	import { useQueryClient } from '@tanstack/svelte-query';

	const isDesktop = mediaQuery('(min-width: 1024px)');

	const queryClient = useQueryClient();

	// Listen to new message
	listenEvent<SendMessageSuccessResponseBody>('newMessage', (response) => {
		// Update chat message query data
		const newMessage = response.data.message;
		const newInbox = response.data.chatInbox;
		updateSendMessageQueryData(queryClient, newInbox, newMessage);

		// Update inbox query data
	});

	// Listen to edited message
	listenEvent<EditMessageSuccessResponseBody>('newEditMessage', (response) => {
		// Update chat message query data
		const editedMessage = response.data;
		editChatMessageQueryData(queryClient, editedMessage);

		// Update inbox query data
	});

	// Listen to deleted message
	listenEvent<DeleteMessageSuccessResponseBody>('newDeleteMessage', (response) => {
		// Update chat message query data
		const deletedMessage = response.data;
		deleteChatMessageQueryData(queryClient, deletedMessage);

		// Update inbox query data
	});

	// Listen to read chats
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
