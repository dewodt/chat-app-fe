<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { ToastResponseFactory } from '$lib/components/ui/sonner';
	import {
		deleteMessageService,
		type DeleteMessageError,
		type DeleteMessageRequestBody,
		type DeleteMessageSuccessResponseBody,
		type GetChatMessageSuccessResponseBody
	} from '$lib/services/chats';
	import type { Message } from '$types';
	import { createMutation, useQueryClient, type InfiniteData } from '@tanstack/svelte-query';

	export let isDeleteOpen = false;
	export let initialMessage: Message & {
		content: NonNullable<Message['content']>;
		deletedAt: null;
	};

	export let isPendingDelete: boolean;
	$: {
		isPendingDelete = $mutation.isPending;
	}

	const queryClient = useQueryClient();
	const mutation = createMutation<
		DeleteMessageSuccessResponseBody,
		DeleteMessageError,
		DeleteMessageRequestBody
	>({
		mutationFn: async (body) => {
			// await new Promise((resolve) => setTimeout(resolve, 5000));
			// throw new Error('Error');

			const response = await deleteMessageService(body);
			return response;
		},
		onMutate: () => {
			// Loading toast
			ToastResponseFactory.createLoading('Please wait while we delete your message.');

			// Close delete popup
			isDeleteOpen = false;
		},
		onSuccess: (response) => {
			// Update message data
			// Update message
			queryClient.setQueryData<InfiniteData<GetChatMessageSuccessResponseBody>>(
				['chat-message', initialMessage.chatId],
				(oldData) => {
					if (!oldData) return oldData;

					// Find the message
					const pageIdx = oldData.pages.findIndex((page) => {
						return page.data.some((message) => message.messageId === initialMessage.messageId);
					});
					if (pageIdx === -1) return oldData;

					// Update the message
					const deletedMessage = response.data;
					const newPage = {
						...oldData.pages[pageIdx],
						data: oldData.pages[pageIdx].data.map((message) => {
							if (message.messageId === initialMessage.messageId) {
								return deletedMessage;
							}
							return message;
						})
					};

					// Update the data
					const newPages = [
						...oldData.pages.slice(0, pageIdx),
						newPage,
						...oldData.pages.slice(pageIdx + 1)
					];

					return {
						pageParams: oldData.pageParams,
						pages: newPages
					};
				}
			);

			// Success toast
			ToastResponseFactory.createSuccess(response.message);
		},
		onError: (error) => {
			// Error toast
			ToastResponseFactory.createError(error);
		}
	});

	const handleDelete = () => {
		$mutation.mutate({
			messageId: initialMessage.messageId
		});
	};
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
			<AlertDialog.Action on:click={handleDelete}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
