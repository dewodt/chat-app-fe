<script lang="ts">
	import { getFormattedTime } from '$lib/utils/datetime';
	import type { Message } from '$types';
	import { Ban, Check, CheckCheck } from 'lucide-svelte';
	import MyMessageDropdown from './my-message-dropdown.svelte';
	import EditMessagePopup from './edit-message-popup.svelte';
	import DeleteMessagePopup from './delete-message-popup.svelte';

	// Props
	export let message: Message;

	// State
	let isDropdownOpen = false;
	let isEditOpen = false;
	let isDeleteOpen = false;
</script>

<div class="group relative ml-8 w-fit max-w-2xl rounded-lg bg-primary px-3 py-2">
	{#if !message.deletedAt}
		<p class="text-primary-foreground">{message.content}</p>
	{:else}
		<div class="flex flex-row items-center gap-1.5 text-primary-foreground/60">
			<Ban class="size-4" />
			<p>You deleted this message</p>
		</div>
	{/if}

	<div
		class="flex flex-row items-center justify-end text-xs font-medium text-primary-foreground/60"
	>
		{#if message.editedAt}
			<p class="mr-2">Edited</p>
		{/if}

		<p>
			{getFormattedTime(new Date(message.createdAt))}
		</p>

		{#if message.readAt}
			<CheckCheck class="ml-1.5 size-4 text-green-400" />
		{:else}
			<Check class="ml-1.5 size-4" />
		{/if}
	</div>

	<!-- Dropdown -->
	<MyMessageDropdown
		class="absolute -right-0.5 -top-0.5"
		bind:isDropdownOpen
		bind:isEditOpen
		bind:isDeleteOpen
	/>

	<!-- Edit Dialog -->
	<EditMessagePopup bind:isEditOpen initialMessage={message} />

	<!-- Delete configmation -->
	<DeleteMessagePopup bind:isDeleteOpen initialMessage={message} />
</div>
