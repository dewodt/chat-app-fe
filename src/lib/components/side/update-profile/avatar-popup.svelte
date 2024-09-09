<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import EditProfileForm from './update-profile-form.svelte';
	import AvatarUser from '../../shared/avatar-user.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { getProfileDataService, type GetProfileDataError } from '$lib/services/users';
	import LoadingFill from '$lib/components/shared/loading-fill.svelte';
	import ErrorFill from '$lib/components/shared/error-fill.svelte';
	import type { ProfileData } from '$types';

	let open = false;
	const handleClose = () => {
		open = false;
	};

	const isDesktop = mediaQuery('(min-width: 1024px)');

	// Get initial form data
	const query = createQuery<ProfileData, GetProfileDataError>({
		queryKey: ['profile-data'],
		retry: 1,
		refetchOnWindowFocus: false,
		queryFn: async () => {
			// await new Promise((resolve) => setTimeout(resolve, 2500));
			// throw new Error('An error occurred');
			const responseBody = await getProfileDataService();
			return responseBody.data;
		}
	});
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<!-- Trigger -->
		<Dialog.Trigger>
			<AvatarUser src={$query.data?.avatarUrl} />
		</Dialog.Trigger>

		<!-- Content -->
		<Dialog.Content class="sm:max-w-[480px]">
			<!-- Title -->
			<Dialog.Header>
				<Dialog.Title>Edit My Profile</Dialog.Title>
				<Dialog.Description>Make changes to your profile here.</Dialog.Description>
			</Dialog.Header>

			<!-- Loading -->
			{#if $query.isPending}
				<LoadingFill class="h-[456px]" />
			{/if}

			<!-- Error -->
			{#if $query.isError}
				<ErrorFill
					class="h-[456px]"
					statusText={$query.error.response?.statusText}
					message={$query.error.response?.data.message}
					refetch={$query.refetch}
				/>
			{/if}

			<!-- Form -->
			{#if $query.isSuccess}
				<EditProfileForm initialProfileData={$query.data} onSuccessSubmit={handleClose} />
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<!-- Trigger -->
		<Drawer.Trigger>
			<AvatarUser src={$query.data?.avatarUrl} />
		</Drawer.Trigger>

		<!-- Content -->
		<Drawer.Content>
			<!-- Title -->
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>Make changes to your profile here.</Drawer.Description>
			</Drawer.Header>

			<!-- Loading -->
			{#if $query.isPending}
				<LoadingFill class="h-[456px] px-4" />
			{/if}

			<!-- Error -->
			{#if $query.isError}
				<ErrorFill
					class="h-[456px] px-4"
					statusText={$query.error.response?.statusText}
					message={$query.error.response?.data.message}
					refetch={$query.refetch}
				/>
			{/if}

			<!-- Form -->
			{#if $query.isSuccess}
				<EditProfileForm
					class="px-4"
					initialProfileData={$query.data}
					onSuccessSubmit={handleClose}
				/>
			{/if}

			<!-- Cancel -->
			<Drawer.Footer class="pb-4 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
