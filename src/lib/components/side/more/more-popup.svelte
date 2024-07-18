<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { EllipsisVertical, Lock, LogOut } from 'lucide-svelte';
</script>

<DropdownMenu.Root>
	<!-- Trigger -->
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" size="icon" builders={[builder]}>
			<EllipsisVertical class="text-gray-700" />
		</Button>
	</DropdownMenu.Trigger>

	<!-- Content -->
	<DropdownMenu.Content align="end">
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<Lock class="mr-2 size-4" />
				<span>Security</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item class="text-destructive">
				<LogOut class="mr-2 size-4" />
				<span class="leading-none">Logout</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
