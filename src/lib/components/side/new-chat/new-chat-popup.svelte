<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { MessageSquarePlus } from 'lucide-svelte';
	import FriendList from './friend-list.svelte';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<!-- Trigger -->
		<Dialog.Trigger asChild let:builder>
			<Button variant="ghost" size="icon" builders={[builder]}>
				<MessageSquarePlus class="text-gray-700" />
			</Button>
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="gap-2 px-0 sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header class="px-6">
				<Dialog.Title>New Chat</Dialog.Title>
				<Dialog.Description>Create a new conversation.</Dialog.Description>
			</Dialog.Header>

			<!-- Friend List -->
			<FriendList />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<!-- Trigger -->
		<Drawer.Trigger asChild let:builder>
			<Button variant="ghost" size="icon" builders={[builder]}>
				<MessageSquarePlus class="text-gray-700" />
			</Button>
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>New Chat</Drawer.Title>
				<Drawer.Description>Create a new conversation.</Drawer.Description>
			</Drawer.Header>

			<!-- Friend List -->
			<FriendList />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
