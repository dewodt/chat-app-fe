<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import FormEditProfile from './edit-profile-form.svelte';
	import AvatarUser from './avatar-user.svelte';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<!-- Trigger -->
		<Dialog.Trigger>
			<AvatarUser />
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Edit My Profile</Dialog.Title>
				<Dialog.Description>Make changes to your profile here.</Dialog.Description>
			</Dialog.Header>

			<!-- Form -->
			<FormEditProfile />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<!-- Trigger -->
		<Drawer.Trigger>
			<AvatarUser />
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>Make changes to your profile here.</Drawer.Description>
			</Drawer.Header>

			<!-- Form -->
			<FormEditProfile class="px-4" />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
