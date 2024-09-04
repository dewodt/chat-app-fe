<script lang="ts">
	import { CircleAlert, RotateCw } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let className = '';
	export { className as class };

	export let status = 500;

	export let message = 'Internal Server Error';

	export let refetch: (() => void) | null = null;
</script>

<main class={cn('flex flex-auto items-center justify-center', className)}>
	<section class="flex flex-col items-center gap-4">
		<div class="flex flex-col items-center gap-1.5 text-base font-medium text-destructive">
			<div class="flex items-center gap-2">
				<CircleAlert class="size-5" />
				<p>Error {status}</p>
			</div>
			<p>
				{message}
			</p>
		</div>
		{#if refetch}
			<Button variant="destructive" size="sm" class="px-4" on:click={refetch}>
				<RotateCw class="mr-2 size-4" />
				<span>Retry</span>
			</Button>
		{/if}
	</section>
</main>
