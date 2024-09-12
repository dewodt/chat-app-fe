<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { MessageSquarePlus } from 'lucide-svelte';
	import UserList from './user-list.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { debounce } from '$lib/utils/debounce';
	import { writable } from 'svelte/store';
	import { useQueryClient } from '@tanstack/svelte-query';

	const isDesktop = mediaQuery('(min-width: 1024px)');

	// Search value
	const search = writable<string>('');
	const debouncedSearch = debounce<string>(search, 300);

	// Handle toggle
	let isPopupOpen = false;
	const queryClient = useQueryClient();
	$: {
		if (!isPopupOpen) {
			$search = '';
			queryClient.removeQueries({
				queryKey: ['find-users']
			});
		}
	}
</script>

{#if $isDesktop}
	<Dialog.Root bind:open={isPopupOpen}>
		<!-- Trigger -->
		<Dialog.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
				builders={[builder]}
			>
				<MessageSquarePlus />
			</Button>
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="gap-0 px-0 pb-0 sm:max-w-[480px]">
			<!-- Title -->
			<Dialog.Header class="space-y-3 border-b px-6 pb-4">
				<div class="space-y-1.5">
					<Dialog.Title>New Chat</Dialog.Title>
					<Dialog.Description>Create a new conversation.</Dialog.Description>
				</div>

				<Input bind:value={$search} placeholder="Search username" />
			</Dialog.Header>

			<!-- User List -->
			<UserList debouncedSearch={$debouncedSearch} bind:isPopupOpen />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={isPopupOpen}>
		<!-- Trigger -->
		<Drawer.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
				builders={[builder]}
			>
				<MessageSquarePlus />
			</Button>
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="gap-0 space-y-3 border-b text-left">
				<div class="space-y-1.5">
					<Drawer.Title>New Chat</Drawer.Title>
					<Drawer.Description>Create a new conversation.</Drawer.Description>
				</div>

				<Input bind:value={$search} placeholder="Search username" />
			</Drawer.Header>

			<!-- User List -->
			<UserList debouncedSearch={$debouncedSearch} bind:isPopupOpen />

			<!-- Cancel -->
			<Drawer.Footer class="border-t pb-4 pt-3">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
