<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { cn } from '$lib/utils/ui';
	import { UserRound } from 'lucide-svelte';

	// Props
	let className = '';
	export { className as class };

	let avatarURL: string | null | undefined = '';
	export { avatarURL as src };
</script>

<Avatar.Root class={cn('size-10', className)}>
	<Avatar.Image src={avatarURL} />
	<Avatar.Fallback class="bg-gray-400 dark:bg-gray-500">
		<UserRound class="stroke-gray-200" />
	</Avatar.Fallback>
</Avatar.Root>
