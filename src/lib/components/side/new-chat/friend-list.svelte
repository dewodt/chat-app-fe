<script lang="ts">
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { mockUsers } from '$lib/mocks/user';
	import { cn } from '$lib/utils';
	import AvatarUser from '../edit-profile/avatar-user.svelte';

	// Props
	let className = '';
	export { className as class };
</script>

<ScrollArea class={cn('h-80 overflow-auto', className)}>
	<ul class="grid grid-cols-1">
		{#each mockUsers as user (user.id)}
			<li class="flex">
				<button
					class="flex flex-auto flex-row items-center gap-3 px-4 py-3 transition-all duration-150 ease-in-out hover:bg-muted lg:px-6"
				>
					<AvatarUser class="size-12" />
					<div>
						<h4 class="text-start text-base font-medium leading-tight">{user.username}</h4>
						<p class="line-clamp-1 text-start text-sm leading-tight">{user.about}</p>
					</div>
				</button>
			</li>
		{/each}
	</ul>
</ScrollArea>
