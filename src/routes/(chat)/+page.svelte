<script lang="ts">
	import Side from '$lib/components/side/side.svelte';
	import HeadTemplate from '$lib/components/shared/head-template.svelte';
	import { selectedChatStore } from '$lib/stores';
	import ChatDetail from '$lib/components/chat/chat-detail.svelte';
	import ChatEmpty from '$lib/components/chat/chat-empty.svelte';
	import { mediaQuery } from 'svelte-legos';

	const isDesktop = mediaQuery('(min-width: 1024px)');
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
