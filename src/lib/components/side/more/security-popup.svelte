<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SecurityForm from './security-form.svelte';

	export let isSecurityOpen: boolean;

	const isDesktop = mediaQuery('(min-width: 1024px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open={isSecurityOpen}>
		<!-- Content -->
		<Dialog.Content class="sm:max-w-[425px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Security</Dialog.Title>
				<Dialog.Description>Change your password here.</Dialog.Description>
			</Dialog.Header>

			<!-- Form -->
			<SecurityForm bind:isSecurityOpen />
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={isSecurityOpen}>
		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Security</Drawer.Title>
				<Drawer.Description>Change your password here.</Drawer.Description>
			</Drawer.Header>

			<!-- Form -->
			<SecurityForm class="px-4" bind:isSecurityOpen />

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
