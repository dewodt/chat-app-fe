<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive } from 'bits-ui';
	import { Scrollbar } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = ScrollAreaPrimitive.Props & {
		orientation?: 'vertical' | 'horizontal' | 'both';
		scrollbarXClasses?: string;
		scrollbarYClasses?: string;

		scrollViewport?: HTMLDivElement;
		scrollContent?: HTMLDivElement;
		scrollBar?: HTMLDivElement;
		scrollThumb?: HTMLDivElement;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let orientation = 'vertical';
	export let scrollbarXClasses: string = '';
	export let scrollbarYClasses: string = '';

	export let scrollViewport: HTMLDivElement | undefined = undefined;
	export let scrollContent: HTMLDivElement | undefined = undefined;
	export let scrollBar: HTMLDivElement | undefined = undefined;
	export let scrollThumb: HTMLDivElement | undefined = undefined;
</script>

<ScrollAreaPrimitive.Root {...$$restProps} class={cn('relative overflow-hidden', className)}>
	<ScrollAreaPrimitive.Viewport class="h-full w-full rounded-[inherit]" bind:el={scrollViewport}>
		<ScrollAreaPrimitive.Content bind:el={scrollContent}>
			<slot />
		</ScrollAreaPrimitive.Content>
	</ScrollAreaPrimitive.Viewport>
	{#if orientation === 'vertical' || orientation === 'both'}
		<Scrollbar orientation="vertical" class={scrollbarYClasses} bind:scrollBar bind:scrollThumb />
	{/if}
	{#if orientation === 'horizontal' || orientation === 'both'}
		<Scrollbar orientation="horizontal" class={scrollbarXClasses} bind:scrollBar bind:scrollThumb />
	{/if}
	<ScrollAreaPrimitive.Corner />
</ScrollAreaPrimitive.Root>
