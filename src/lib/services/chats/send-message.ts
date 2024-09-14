import { emitWithAck } from '$lib/utils/socket-io';
import type { ChatInbox, Message, SuccessResponseDto } from '$types';
import type { GetChatInboxSuccessResponseBody } from './get-chat-inbox';
import type { GetChatMessageSuccessResponseBody } from './get-chat-message';
import { QueryClient, type InfiniteData } from '@tanstack/svelte-query';

export interface SendMessageRequestBody {
	chatId: string;
	message: string;
}

export interface SendMessageSuccessResponseData {
	chatInbox: ChatInbox;
	message: Message;
}

export type SendMessageSuccessResponseBody = SuccessResponseDto<SendMessageSuccessResponseData>;

export type SendMessageError = Error;

export async function sendMessageService(
	body: SendMessageRequestBody
): Promise<SendMessageSuccessResponseBody> {
	const response = await emitWithAck<SendMessageSuccessResponseBody>('sendMessage', body);
	return response;
}

// Update chat inbox
export function updateSendMessageQueryDataInbox(
	queryClient: QueryClient,
	responseData: SendMessageSuccessResponseData
) {
	queryClient.setQueriesData<InfiniteData<GetChatInboxSuccessResponseBody>>(
		{
			queryKey: ['chat-inbox']
		},
		(oldData) => {
			if (!oldData) return oldData;

			// Find if the inbox is in the list
			const pageIdx = oldData.pages.findIndex((page) =>
				page.data.some((inbox) => inbox.chatId === responseData.chatInbox.chatId)
			);

			if (pageIdx === -1) {
				// If not found, add it to the first page
				const firstPage = oldData.pages[0];
				const newFirstPage: GetChatInboxSuccessResponseBody = {
					...firstPage,
					data: [responseData.chatInbox, ...firstPage.data]
				};
				const newPages = [newFirstPage, ...oldData.pages.slice(1)];

				return {
					pageParams: oldData.pageParams,
					pages: newPages
				};
			} else {
				// If found, remove from found page and move it to the first page
				const foundPage = oldData.pages[pageIdx];
				const updatedFoundPage: GetChatInboxSuccessResponseBody = {
					...foundPage,
					data: foundPage.data.filter((inbox) => inbox.chatId !== responseData.chatInbox.chatId)
				};
				const firstPage = oldData.pages[0];
				const newFirstPage: GetChatInboxSuccessResponseBody = {
					...firstPage,
					data: [
						responseData.chatInbox,
						...firstPage.data.filter((inbox) => inbox.chatId !== responseData.chatInbox.chatId)
					]
				};

				if (pageIdx == 0) {
					const newPages = [newFirstPage, ...oldData.pages.slice(1)];

					return {
						pageParams: oldData.pageParams,
						pages: newPages
					};
				} else {
					const newPages = [
						newFirstPage,
						...oldData.pages.slice(1, pageIdx),
						updatedFoundPage,
						...oldData.pages.slice(pageIdx + 1)
					];

					return {
						pageParams: oldData.pageParams,
						pages: newPages
					};
				}
			}
		}
	);
}

// Update messages
export function updateSendMessageQueryDataMessage(
	queryClient: QueryClient,
	responseData: SendMessageSuccessResponseData
) {
	queryClient.setQueryData<InfiniteData<GetChatMessageSuccessResponseBody>>(
		['chat-message', responseData.message.chatId],
		(oldData) => {
			if (!oldData) return oldData;

			// Add the new message to the first page
			const firstPage = oldData.pages[0];
			const newPage = {
				...firstPage,
				data: [responseData.message, ...firstPage.data]
			};
			const updatedPage = [newPage, ...oldData.pages.slice(1)];

			return {
				pageParams: oldData.pageParams,
				pages: updatedPage
			};
		}
	);
}
