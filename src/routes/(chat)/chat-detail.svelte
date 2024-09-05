<script lang="ts">
	import AvatarUser from '$lib/components/side/update-profile/avatar-user.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { SendHorizontal } from 'lucide-svelte';
	import { mockChat } from '$lib/mocks/chat';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { getFormattedTime } from '$lib/utils';
</script>

<main class="flex flex-auto flex-col">
	<!-- Header -->
	<header class="flex h-[60px] flex-none flex-row items-center gap-2.5 border-b bg-muted px-4">
		<AvatarUser />

		<div class="space-y-0.5">
			<!-- Title -->
			<h4 class="line-clamp-1 text-start text-sm font-medium">Dewantoro Triatmojo</h4>

			<!-- Preview -->
			<p class="line-clamp-1 text-start text-xs text-muted-foreground">This is my status</p>
		</div>
	</header>

	<!-- Content -->
	<ScrollArea orientation="vertical" class="flex flex-auto">
		<ol class="flex flex-col gap-4 px-6 py-6">
			{#each mockChat as message (message.id)}
				{#if message.isMine}
					<li
						class="w-fit max-w-2xl self-end rounded-lg bg-primary px-3 py-2 text-primary-foreground"
					>
						<p>{message.message}</p>
						<p class="text-end text-[10px] font-medium">{getFormattedTime(message.datetime)}</p>
					</li>
				{:else}
					<li
						class="w-fit max-w-2xl self-start rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
					>
						<p>{message.message}</p>
						<p class="text-end text-[10px] font-medium">{getFormattedTime(message.datetime)}</p>
					</li>
				{/if}
			{/each}
		</ol>
	</ScrollArea>

	<!-- Message Input -->
	<section class="flex flex-row gap-3 border-t bg-muted px-5 py-3">
		<Input placeholder="Type a message" class="focus-visible:ring-0 focus-visible:ring-offset-0" />

		<Button size="icon" class="flex-none">
			<SendHorizontal class="size-5" />
		</Button>
	</section>
</main>
