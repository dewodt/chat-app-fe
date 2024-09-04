<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="space-y-2.5 bg-white px-3 py-2.5">
	<!-- Search Input -->
	<search class="flex flex-row items-center gap-3 rounded-md bg-muted px-3 py-2.5">
		<Search class="size-5 text-muted-foreground" />
		<input
			class="w-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
			placeholder="Search"
		/>
	</search>

	<!-- Filters (All, Unread) -->
	<!-- <div class="flex flex-row gap-2">
		<Button variant="default" class="h-auto rounded-full px-4 py-1.5 text-sm">All</Button>

		<Button variant="secondary" class="h-auto rounded-full px-4 py-1.5 text-sm">Unread</Button>
	</div> -->
</div>
