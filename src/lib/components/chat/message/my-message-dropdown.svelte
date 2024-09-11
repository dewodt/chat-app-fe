<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils/ui';
	import { ChevronDown, SquarePen, Trash2 } from 'lucide-svelte';

	// Props
	let className = '';
	export { className as class };
	let isDropdownOpen: boolean;
	export let isEditOpen: boolean;
	export let isDeleteOpen: boolean;

	export let isPendingEdit: boolean;
	export let isPendingDelete: boolean;

	const handleEdit = () => {
		isDropdownOpen = false;
		isEditOpen = true;
	};

	const handleDelete = () => {
		isDropdownOpen = false;
		isDeleteOpen = true;
	};
</script>

<DropdownMenu.Root bind:open={isDropdownOpen}>
	<DropdownMenu.Trigger
		class={cn(
			'rounded-full p-1.5 transition-all',
			isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
			className
		)}
	>
		<ChevronDown class="size-4 text-primary-foreground" />
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={-4} align="end" class="min-w-28">
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={handleEdit} disabled={isPendingEdit || isPendingDelete}>
				<SquarePen class="mr-2 size-4" />
				<span>Edit</span>
			</DropdownMenu.Item>

			<DropdownMenu.Item
				class="text-destructive data-[highlighted]:text-destructive"
				on:click={handleDelete}
				disabled={isPendingEdit || isPendingDelete}
			>
				<Trash2 class="mr-2 size-4" />
				<span>Delete</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
