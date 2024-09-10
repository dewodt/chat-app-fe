<script lang="ts">
	import { CircleAlert, RotateCw } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { cn } from '$lib/utils/ui';

	let className = '';
	export { className as class };

	export let statusText = 'Internal Server Error';

	export let message = 'An error occurred while processing your request.';

	export let refetch: (() => void) | null = null;
</script>

<div class={cn('flex flex-auto items-center justify-center', className)}>
	<div class="flex flex-col items-center gap-4">
		<div
			class="flex flex-col items-center gap-1 text-center text-base font-medium text-destructive"
		>
			<div class="flex items-center gap-2">
				<CircleAlert class="size-5" />
				<p>Error: {statusText}</p>
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
	</div>
</div>
