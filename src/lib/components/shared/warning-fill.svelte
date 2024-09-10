<script lang="ts">
	import { cn } from '$lib/utils/ui';
	import { CircleAlert } from 'lucide-svelte';

	let className = '';
	export { className as class };

	export let message: string;
</script>

<div
	class={cn(
		'flex flex-auto flex-col items-center justify-center gap-1 text-center text-muted-foreground',
		className
	)}
>
	<CircleAlert class="size-6" />
	<p>{message}</p>
</div>
