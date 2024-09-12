import { emitWithAck } from '$lib/utils/socket-io';
import type { SuccessResponseDto } from '$types';
import type { GetChatInboxSuccessResponseBody } from './get-chat-inbox';
import type { GetChatMessageSuccessResponseBody } from './get-chat-message';
import type { InfiniteData, QueryClient } from '@tanstack/svelte-query';

export interface DeleteMessageRequestBody {
	messageId: string;
}

export interface DeleteMessageSuccessResponseData {
	chatId: string;
	messageId: string;
	deletedAt: string;
}

export type DeleteMessageSuccessResponseBody = SuccessResponseDto<DeleteMessageSuccessResponseData>;

export type DeleteMessageError = Error;

export async function deleteMessageService(
	body: DeleteMessageRequestBody
): Promise<DeleteMessageSuccessResponseBody> {
	const response = await emitWithAck<DeleteMessageSuccessResponseBody>('deleteMessage', body);
	return response;
}

export function deleteChatMessageQueryData(
	queryClient: QueryClient,
	responseData: DeleteMessageSuccessResponseData
) {
	// Update inbox if message is appeared in inbox
	queryClient.setQueriesData<InfiniteData<GetChatInboxSuccessResponseBody>>(
		{
			queryKey: ['chat-inbox']
		},
		(oldData) => {
			if (!oldData) return oldData;

			// Find if there is a chat id and messageid deleted in the inbox
			const pageIdx = oldData.pages.findIndex((page) =>
				page.data.some(
					(inbox) =>
						inbox.chatId == responseData.chatId &&
						inbox.lastMessage &&
						inbox.lastMessage.messageId == responseData.messageId
				)
			);
			if (pageIdx == -1) return oldData;

			// Update the inbox
			const newPage = {
				...oldData.pages[pageIdx],
				data: oldData.pages[pageIdx].data.map((inbox) => {
					if (
						inbox.chatId == responseData.chatId &&
						inbox.lastMessage &&
						inbox.lastMessage.messageId == responseData.messageId
					) {
						return {
							...inbox,
							lastMessage: {
								...inbox.lastMessage,
								content: null,
								deletedAt: responseData.deletedAt
							}
						};
					}

					return inbox;
				})
			};

			// Update the pages
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

	// Update messages
	queryClient.setQueryData<InfiniteData<GetChatMessageSuccessResponseBody>>(
		['chat-message', responseData.chatId],
		(oldData) => {
			if (!oldData) return oldData;

			// Find the message
			const pageIdx = oldData.pages.findIndex((page) => {
				return page.data.some((message) => message.messageId === responseData.messageId);
			});

			if (pageIdx === -1) return oldData;

			// Update the message
			const newPage = {
				...oldData.pages[pageIdx],
				data: oldData.pages[pageIdx].data.map((message) => {
					if (message.messageId === responseData.messageId) {
						return {
							...message,
							content: null,
							deletedAt: responseData.deletedAt
						};
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
}
