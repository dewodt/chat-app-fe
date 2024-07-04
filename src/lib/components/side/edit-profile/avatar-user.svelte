<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { UserRound } from 'lucide-svelte';
</script>

<Avatar.Root class="size-10">
	<Avatar.Image src="https://randomuser.me/api/portraits/men/0.jg" />
	<Avatar.Fallback class="bg-gray-400">
		<UserRound class="stroke-gray-200" />
	</Avatar.Fallback>
</Avatar.Root>
