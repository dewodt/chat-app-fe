<script lang="ts">
	import { getFormattedTime } from '$lib/utils';
	import type { Message } from '$types';
	import { Ban } from 'lucide-svelte';

	export let message: Message;
</script>

<div class="mr-8 w-fit max-w-2xl rounded-lg bg-secondary px-3 py-2">
	{#if !message.deletedAt}
		<p class="text-secondary-foreground">{message.content}</p>
	{:else}
		<div class="flex flex-row items-center gap-1.5 text-muted-foreground">
			<Ban class="size-4" />
			<p>This message was deleted</p>
		</div>
	{/if}

	<div class="flex flex-row justify-end text-xs font-medium text-muted-foreground">
		{#if message.editedAt}
			<p class="mr-2">Edited</p>
		{/if}

		<p>
			{getFormattedTime(new Date(message.createdAt))}
		</p>
	</div>
</div>
