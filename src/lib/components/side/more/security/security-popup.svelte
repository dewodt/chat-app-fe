<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SecurityForm from './security-form.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Lock } from 'lucide-svelte';
	import type { CustomEventHandler } from 'bits-ui';

	export let isDropdownOpen: boolean;

	let isSecurityPopupOpen: boolean = false;

	const isDesktop = mediaQuery('(min-width: 1024px)');

	const handleToggleDialogDrawer = (newOpen: boolean) => {
		isSecurityPopupOpen = newOpen;

		if (!newOpen) {
			setTimeout(() => {
				isDropdownOpen = false;
			}, 150);
		}
	};

	const handleCloseDialogDrawer = () => {
		isSecurityPopupOpen = false;

		setTimeout(() => {
			isDropdownOpen = false;
		}, 150);
	};

	const handleOpenDialogDrawer = (e: CustomEventHandler) => {
		e.preventDefault();

		isSecurityPopupOpen = true;
	};
</script>

{#if $isDesktop}
	<Dialog.Root bind:open={isSecurityPopupOpen} onOpenChange={handleToggleDialogDrawer}>
		<!-- Trigger -->
		<Dialog.Trigger asChild>
			<DropdownMenu.Item on:click={handleOpenDialogDrawer}>
				<Lock class="mr-2 size-4" />
				<span>Security</span>
			</DropdownMenu.Item>
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Security</Dialog.Title>
				<Dialog.Description>Change your password here.</Dialog.Description>
			</Dialog.Header>

			<!-- Form -->
			<SecurityForm onSuccessSubmit={handleCloseDialogDrawer} />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={isSecurityPopupOpen} onOpenChange={handleToggleDialogDrawer}>
		<!-- Trigger -->
		<Drawer.Trigger class="w-full">
			<DropdownMenu.Item on:click={handleOpenDialogDrawer}>
				<Lock class="mr-2 size-4" />
				<span>Security</span>
			</DropdownMenu.Item>
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Security</Drawer.Title>
				<Drawer.Description>Change your password here.</Drawer.Description>
			</Drawer.Header>

			<!-- Form -->
			<SecurityForm class="px-4" onSuccessSubmit={handleCloseDialogDrawer} />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
