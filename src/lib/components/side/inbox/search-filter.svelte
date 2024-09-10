<script lang="ts">
	import { Search } from 'lucide-svelte';

	export let value: string;
</script>

<div class="flex h-fit flex-none space-y-2.5 bg-background px-3 py-2.5">
	<!-- Search Input -->
	<search class="flex flex-auto flex-row items-center gap-3 rounded-md bg-muted px-3 py-2.5">
		<Search class="size-5 text-muted-foreground" />
		<input
			class="w-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
			placeholder="Search"
			bind:value
		/>
	</search>
</div>
