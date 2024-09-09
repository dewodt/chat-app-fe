<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { MessageSquarePlus } from 'lucide-svelte';
	import UserList from './user-list.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { debounce } from '$lib/debounce';
	import { writable } from 'svelte/store';
	import { useQueryClient } from '@tanstack/svelte-query';

	const isDesktop = mediaQuery('(min-width: 1024px)');

	// Search value
	const search = writable<string>('');
	const debouncedSearch = debounce<string>(search, 300);

	// Handle toggle
	let open = false;
	const queryClient = useQueryClient();
	const handleToggle = (newState: boolean) => {
		open = newState;

		// Reset search
		if (!newState) {
			$search = '';

			queryClient.removeQueries({
				queryKey: ['find-users']
			});
		}
	};
</script>

{#if $isDesktop}
	<Dialog.Root bind:open onOpenChange={handleToggle} onOutsideClick={() => handleToggle(false)}>
		<!-- Trigger -->
		<Dialog.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full hover:bg-gray-200"
				builders={[builder]}
			>
				<MessageSquarePlus class="text-gray-700" />
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
			<UserList debouncedSearch={$debouncedSearch} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open onOpenChange={handleToggle} onOutsideClick={() => handleToggle(false)}>
		<!-- Trigger -->
		<Drawer.Trigger asChild let:builder>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full hover:bg-gray-200"
				builders={[builder]}
			>
				<MessageSquarePlus class="text-gray-700" />
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
			<UserList debouncedSearch={$debouncedSearch} />

			<!-- Cancel -->
			<Drawer.Footer class="border-t pb-4 pt-3">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
