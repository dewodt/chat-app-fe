<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle } from 'lucide-svelte';

	let className = '';
	export { className as class };
</script>

<main class={cn('flex flex-auto items-center justify-center', className)}>
	<section class="flex items-center gap-3 text-muted-foreground">
		<LoaderCircle class="size-5 animate-spin" />
		<p class="text-base font-medium">Loading...</p>
	</section>
</main>
