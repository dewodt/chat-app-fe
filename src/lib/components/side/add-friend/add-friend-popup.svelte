<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { UserPlus } from 'lucide-svelte';
	import AddFriendForm from './add-friend-form.svelte';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<!-- Trigger -->
		<Dialog.Trigger asChild let:builder>
			<Button variant="ghost" size="icon" builders={[builder]}>
				<UserPlus class="text-gray-700" />
			</Button>
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Add New Friend</Dialog.Title>
				<Dialog.Description>Add a new friend to start a new conversation.</Dialog.Description>
			</Dialog.Header>

			<!-- Form -->
			<AddFriendForm />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<!-- Trigger -->
		<Drawer.Trigger asChild let:builder>
			<Button variant="ghost" size="icon" builders={[builder]}>
				<UserPlus class="text-gray-700" />
			</Button>
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Add New Friend</Drawer.Title>
				<Drawer.Description>
					Add a new friend by entering their username to start a new conversation.
				</Drawer.Description>
			</Drawer.Header>

			<!-- Form -->
			<AddFriendForm class="px-4" />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
