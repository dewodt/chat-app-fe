<script lang="ts">
	import Side from '$lib/components/side/side.svelte';
	import HeadTemplate from '$lib/components/shared/head-template.svelte';
	import ChatDetail from '../../lib/components/chat/chat-detail.svelte';
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
</script>

<HeadTemplate
	title="Chat App"
	description="Chat App is a simple chat application that allows you to chat with your friends."
/>

<Side />

<ChatDetail />
