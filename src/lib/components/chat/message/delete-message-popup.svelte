<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Message } from '$types';
	import { createMutation } from '@tanstack/svelte-query';

	export let isDeleteOpen = false;
	export let initialMessage: Message;

	const mutation = createMutation({
		mutationFn: async () => {
			console.log(initialMessage);
		}
	});
</script>

<AlertDialog.Root bind:open={isDeleteOpen}>
	<AlertDialog.Content class="w-80 rounded-lg sm:w-auto">
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your message.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
