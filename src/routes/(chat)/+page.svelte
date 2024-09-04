<script lang="ts">
	import Side from '$lib/components/side/side.svelte';
	import HeadTemplate from '$lib/components/head/head-template.svelte';
	import ChatDetail from './chat-detail.svelte';
	import ProtectedLayout from '$lib/components/auth/protected-layout.svelte';
	import type { PageData } from './$types';
	import { setContext } from 'svelte';
	import { securityFormContextKey } from '$lib/contexts/form';

	export let data: PageData;

	setContext(securityFormContextKey, data.securityForm);
</script>

<HeadTemplate
	title="Chat App"
	description="Chat App is a simple chat application that allows you to chat with your friends."
/>

<ProtectedLayout protectedTo="authenticated-only">
	<Side />

	<ChatDetail />
</ProtectedLayout>
