<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { EllipsisVertical, LogOut } from 'lucide-svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import {
		signOutService,
		type SignOutError,
		type SignOutSuccessResponseBody
	} from '$lib/services/auth';
	import { goto } from '$app/navigation';
	import { sessionStore } from '$lib/stores';
	import SecurityPopup from './security/security-popup.svelte';
	import { writable } from 'svelte/store';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';

	// Dropdown state
	const isDropdownOpen = writable(false);

	const queryClient = useQueryClient();

	const mutation = createMutation<SignOutSuccessResponseBody, SignOutError>({
		mutationFn: async () => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Failed to sign out');
			const responseBody = await signOutService();
			return responseBody;
		},
		onMutate(variables) {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we sign you out.');
		},
		onSuccess: (response) => {
			// Success Toast
			ToastResponseFactory.createSuccess(response.message);

			// Redirect to sign in page
			goto('/auth/sign-in');

			// Reset store
			$sessionStore = null;

			// Delete all queries cache
			queryClient.clear();
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		}
	});
</script>

<DropdownMenu.Root bind:open={$isDropdownOpen}>
	<!-- Trigger -->
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" class="rounded-full hover:bg-gray-200" builders={[builder]}>
			<EllipsisVertical class="text-gray-700" />
		</Button>
	</DropdownMenu.Trigger>

	<!-- Content -->
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<!-- Security -->
			<SecurityPopup {isDropdownOpen} />

			<!-- Sign Out -->
			<DropdownMenu.Item
				class="text-destructive data-[highlighted]:text-destructive"
				on:click={() => $mutation.mutate()}
				disabled={$mutation.isPending}
			>
				<LogOut class="mr-2 size-4" />
				<span class="leading-none">Logout</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
