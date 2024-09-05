<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { mockUsers } from '$lib/mocks/user';
	import { cn } from '$lib/utils';
	import AvatarUser from '../update-profile/avatar-user.svelte';

	// Props
	let className = '';
	export { className as class };
</script>

<ScrollArea class={cn('h-80', className)}>
	<ul class="grid grid-cols-1 lg:mb-6">
		{#each mockUsers as user, index (user.id)}
			<li class="flex">
				<button
					class={cn(
						'flex flex-auto flex-row items-center gap-3 px-4 py-3 transition-all duration-150 ease-in-out hover:bg-muted lg:px-6',
						index === mockUsers.length - 1 ? 'border-none' : 'border-b'
					)}
				>
					<!-- Avatar -->
					<AvatarUser class="size-12" />

					<div class="space-y-1">
						<!-- Title -->
						<h4 class="line-clamp-1 text-start text-base font-medium leading-tight">
							{user.username}
						</h4>

						<!-- Preview -->
						<p class="line-clamp-1 text-start text-sm leading-tight text-muted-foreground">
							{user.about}
						</p>
					</div>
				</button>
			</li>
		{/each}
	</ul>
</ScrollArea>
