<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Trash2, UserRound } from 'lucide-svelte';

	// Props
	export let isSubmitting = false;

	let inputElement: Input;

	// TODO: Use svelte query to upload image
	let isUploadingImage = false;
	let uploadedAvatarUrl = '';

	const onUploadAvatar = async () => {
		if (!inputElement.files.length) return;
	};
</script>

<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
	<!-- Avatar Preview -->
	<button
		type="button"
		disabled={isSubmitting || isUploadingImage}
		on:click={() => !isSubmitting && !isUploadingImage && inputElement.click()}
	>
		<Avatar.Root class="size-24">
			<Avatar.Image
				src={uploadedAvatarUrl}
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
			bind:this={inputElement}
			on:change={onUploadAvatar}
		/>

		<!-- File Delete  -->
		<Button
			type="button"
			variant="destructive"
			size="icon"
			class="flex-none"
			disabled={isSubmitting || isUploadingImage || !uploadedAvatarUrl}
			on:click={() => {}}
		>
			<Trash2 class="h-5 w-5" />
		</Button>
	</div>
</div>
