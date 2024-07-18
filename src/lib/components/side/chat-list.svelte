<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { mockChatList } from '$lib/mocks/chat-list';
	import { cn, getRelativeTime } from '$lib/utils';
	import AvatarUser from './edit-profile/avatar-user.svelte';

	// Props
	let className = '';
	export { className as class };
</script>

<ScrollArea class={cn(className)}>
	<ul class="grid grid-cols-1">
		{#each mockChatList as chat (chat.id)}
			{@const isUnread = chat.unreadCount > 0}
			<li class="flex">
				<button
					class="flex flex-auto flex-row items-center justify-between gap-3 border-b px-4 py-3 transition-all duration-150 ease-in-out hover:bg-muted"
				>
					<div class="flex flex-row items-center gap-3">
						<!-- Avatar -->
						<AvatarUser class="size-12" />

						<div>
							<!-- Title -->
							<h4
								class={cn(
									'line-clamp-1 text-start text-base leading-tight',
									isUnread ? 'font-semibold' : 'font-medium'
								)}
							>
								{chat.title}
							</h4>

							<!-- Preview -->
							<p
								class={cn(
									'line-clamp-1 text-start text-sm leading-tight text-muted-foreground',
									isUnread ? 'font-semibold' : 'font-normal'
								)}
							>
								{chat.preview}
							</p>
						</div>
					</div>

					<div class="flex flex-col items-end gap-1">
						<!-- Time preview -->
						<p
							class={cn(
								'text-xs',
								isUnread ? 'font-bold text-primary' : 'font-medium text-muted-foreground'
							)}
						>
							{getRelativeTime(chat.datetime)}
						</p>

						<!-- Chat count -->
						{#if isUnread}
							<div
								class="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white"
							>
								{chat.unreadCount}
							</div>
						{/if}
					</div>
				</button>
			</li>
		{/each}
	</ul>
</ScrollArea>
