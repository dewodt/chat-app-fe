<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Message } from '$types';
	import EditMessageForm from './edit-message-form.svelte';

	// Props
	export let isEditOpen: boolean;
	export let initialMessage: Message;

	const isDesktop = mediaQuery('(min-width: 1024px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open={isEditOpen}>
		<!-- Content -->
		<Dialog.Content class="sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Edit message</Dialog.Title>
				<Dialog.Description>Change message you sent here</Dialog.Description>
			</Dialog.Header>

			<!-- Form -->
			<EditMessageForm {initialMessage} bind:isEditOpen />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={isEditOpen}>
		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit message</Drawer.Title>
				<Drawer.Description>Change message you sent here</Drawer.Description>
			</Drawer.Header>

			<!-- Form -->
			<EditMessageForm class="px-4" {initialMessage} bind:isEditOpen />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
