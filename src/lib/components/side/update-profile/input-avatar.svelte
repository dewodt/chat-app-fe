<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Trash2, UserRound } from 'lucide-svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import {
		uploadAvatarService,
		type UploadAvatarError,
		type UploadAvatarRequestBody,
		type UploadAvatarSuccessResponseBody
	} from '$lib/services/users';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import { avatarSchema } from '$lib/schemas';
	import type { ChangeEventHandler } from 'svelte/elements';

	// Props (bind)
	export let avatarUrl: string | null;
	export let isUploadingImage: boolean;
	export let isSubmitting: Readonly<boolean>;
	export let inputAvatarError: string[] | undefined;

	// Input ref
	let fileInput: HTMLInputElement | undefined;

	// Mutation
	const mutation = createMutation<
		UploadAvatarSuccessResponseBody,
		UploadAvatarError,
		UploadAvatarRequestBody
	>({
		retry: 1,
		mutationFn: async (data) => {
			// await new Promise((resolve) => setTimeout(resolve, 2000));
			// throw new Error('Failed to upload avatar');
			const responseBody = await uploadAvatarService(data);
			return responseBody;
		},
		onMutate: () => {
			// Loading toast
			isUploadingImage = true;
			ToastResponseFactory.createLoading('Please wait while we upload your avatar.');
		},
		onSuccess: (response) => {
			// Success toast
			isUploadingImage = false;
			ToastResponseFactory.createSuccess(response.message);

			// Update avatar
			avatarUrl = response.data.newAvatarUrl;
		},
		onError: (error) => {
			// Error toast
			isUploadingImage = false;
			ToastResponseFactory.createError(error);

			// Error fields
			inputAvatarError = [error.message];
		}
	});

	// Handle upload
	const onUploadAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
		const files = e.currentTarget.files;

		// Empty
		if (!files || !files.length) {
			return;
		}

		// Get file
		const file = files[0];

		// Validate avatar file
		const result = avatarSchema.safeParse(file);
		if (!result.success) {
			inputAvatarError = result.error.errors.map((e) => e.message);
			return;
		}

		// Upload avatar
		const formData = new FormData();
		formData.append('avatarImage', file);
		$mutation.mutate(formData);
	};

	// Handle delete
	const onDeleteAvatar = () => {
		avatarUrl = null;
	};

	// Handle avatar click
	const handleAvatarClick = () => {
		if (!fileInput) {
			return;
		}
		fileInput.click();
	};
</script>

<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
	<!-- Avatar Preview -->
	<button
		type="button"
		disabled={$mutation.isPending || isUploadingImage}
		on:click={handleAvatarClick}
	>
		<Avatar.Root class="size-24">
			<Avatar.Image
				src={avatarUrl}
				alt="Avatar Upload Preview"
				class="object-cover object-center"
			/>
			<Avatar.Fallback>
				<UserRound class="size-16 stroke-gray-500" />
			</Avatar.Fallback>
		</Avatar.Root>
	</button>
	<div class="flex w-full flex-row gap-4 sm:w-auto">
		<!-- File Upload -->
		<Input
			type="file"
			accept="image/*"
			class="file:text-foreground"
			disabled={isSubmitting || isUploadingImage}
			bind:ref={fileInput}
			on:change={onUploadAvatar}
		/>

		<!-- File Delete  -->
		<Button
			type="button"
			variant="destructive"
			size="icon"
			class="flex-none"
			disabled={isSubmitting || isUploadingImage || !avatarUrl}
			on:click={onDeleteAvatar}
		>
			<Trash2 class="h-5 w-5" />
		</Button>
	</div>
</div>
