import { emitWithAck } from '$lib/utils/socket-io';
import type { SuccessResponseDto } from '$types';
import { type GetChatInboxSuccessResponseBody } from './get-chat-inbox';
import type { GetChatMessageSuccessResponseBody } from './get-chat-message';
import type { InfiniteData, QueryClient } from '@tanstack/svelte-query';

export interface EditMessageRequestBody {
	messageId: string;
	message: string;
}

export interface EditMessageSuccessResponseData {
	chatId: string;
	messageId: string;
	newMessage: string;
	editedAt: string;
}

export type EditMessageSuccessResponseBody = SuccessResponseDto<EditMessageSuccessResponseData>;

export type EditMessageError = Error;

export async function editMessageService(
	body: EditMessageRequestBody
): Promise<EditMessageSuccessResponseBody> {
	const response = await emitWithAck<EditMessageSuccessResponseBody>('editMessage', body);
	return response;
}

// Update inbox if message is appeared in inbox
export function updateEditMessageQueryDataInbox(
	queryClient: QueryClient,
	responseData: EditMessageSuccessResponseData
) {
	queryClient.setQueriesData<InfiniteData<GetChatInboxSuccessResponseBody>>(
		{
			queryKey: ['chat-inbox']
		},
		(oldData) => {
			if (!oldData) return oldData;

			// Find if there is chatid and message id edited in the inbox
			const pageIdx = oldData.pages.findIndex((page) =>
				page.data.some(
					(inbox) =>
						inbox.chatId == responseData.chatId &&
						inbox.latestMessage &&
						inbox.latestMessage.messageId == responseData.messageId
				)
			);
			if (pageIdx == -1) return oldData;

			// Update the inbox
			const newPage = {
				...oldData.pages[pageIdx],
				data: oldData.pages[pageIdx].data.map((inbox) => {
					if (
						inbox.chatId == responseData.chatId &&
						inbox.latestMessage &&
						inbox.latestMessage.messageId == responseData.messageId
					) {
						return {
							...inbox,
							latestMessage: {
								...inbox.latestMessage,
								content: responseData.newMessage
							}
						};
					}

					return inbox;
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

// Update messages
export function updateEditMessageQueryDataMessage(
	queryClient: QueryClient,
	responseData: EditMessageSuccessResponseData
) {
	// Update messages
	queryClient.setQueryData<InfiniteData<GetChatMessageSuccessResponseBody>>(
		['chat-message', responseData.chatId],
		(oldData) => {
			if (!oldData) return oldData;

			// Find the page idx of the location of the message
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
							content: responseData.newMessage,
							editedAt: responseData.editedAt
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
