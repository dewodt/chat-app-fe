<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="space-y-2 bg-white px-3 py-2">
	<!-- Search Input -->
	<search class="flex flex-row items-center gap-3 rounded-md bg-muted px-3 py-2.5">
		<Search class="size-5 text-gray-700" />
		<input
			class="w-full bg-transparent text-base placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-0"
			placeholder="Search"
		/>
	</search>

	<!-- Filters (All, Unread) -->
	<div class="flex flex-row gap-2">
		<Button size="sm" variant="default" class="rounded-full px-5 text-sm">All</Button>

		<Button size="sm" variant="secondary" class="rounded-full px-5 text-sm">Unread</Button>
	</div>
</div>
