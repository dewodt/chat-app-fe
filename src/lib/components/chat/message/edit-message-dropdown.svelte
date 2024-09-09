<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { ChevronDown, SquarePen, Trash2 } from 'lucide-svelte';

	// Props
	let className = '';
	export { className as class };
	export let isDropdownOpen: boolean;
	export let isEditOpen: boolean;

	const handleEdit = () => {
		isDropdownOpen = false;
		isEditOpen = true;
	};
</script>

<DropdownMenu.Root bind:open={isDropdownOpen}>
	<DropdownMenu.Trigger
		class={cn(
			'rounded-full p-1.5 transition-all duration-200',
			isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
			className
		)}
	>
		<ChevronDown class="size-4 text-primary-foreground" />
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={-4} align="end" class="min-w-28">
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={handleEdit}>
				<SquarePen class="mr-2 size-4" />
				<span>Edit</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item class="text-destructive data-[highlighted]:text-destructive">
				<Trash2 class="mr-2 size-4" />
				<span>Delete</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
