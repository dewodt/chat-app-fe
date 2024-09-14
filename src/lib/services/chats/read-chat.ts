import { emitWithAck } from '$lib/utils/socket-io';
import type { SuccessResponseDto } from '$types';
import type { GetChatInboxSuccessResponseBody } from './get-chat-inbox';
import type { GetChatMessageSuccessResponseBody } from './get-chat-message';
import type { InfiniteData, QueryClient } from '@tanstack/svelte-query';

export interface ReadChatRequestBody {
	chatId: string;
}

export interface ReadChatSuccessResponseData {
	chatId: string;
	messages: Array<{
		messageId: string;
		readAt: string;
	}>;
}

export type ReadChatSuccessResponseBody = SuccessResponseDto<ReadChatSuccessResponseData>;

export type ReadChatError = Error;

export async function readChatService(
	body: ReadChatRequestBody
): Promise<ReadChatSuccessResponseBody> {
	const response = await emitWithAck<ReadChatSuccessResponseBody>('readChat', body);
	return response;
}

// Inbox data
export function updateReadChatQueryDataInbox(
	queryClient: QueryClient,
	responseData: ReadChatSuccessResponseData
) {
	queryClient.setQueriesData<InfiniteData<GetChatInboxSuccessResponseBody>>(
		{
			queryKey: ['chat-inbox']
		},
		(oldData) => {
			if (!oldData) return oldData;

			// Find page where chat inbox resides
			const pageIdx = oldData.pages.findIndex((page) =>
				page.data.some((inbox) => inbox.chatId === responseData.chatId)
			);

			if (pageIdx === -1) return oldData;

			const page = oldData.pages[pageIdx];
			const newPage = {
				...page,
				data: page.data.map((inbox) => {
					if (inbox.chatId === responseData.chatId) {
						return {
							...inbox,
							unreadCount: 0
						};
					}
					return inbox;
				})
			};

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

// Message data
export function updateReadChatQueryDataMessage(
	queryClient: QueryClient,
	responseData: ReadChatSuccessResponseData
) {
	queryClient.setQueryData<InfiniteData<GetChatMessageSuccessResponseBody>>(
		['chat-message', responseData.chatId],
		(oldData) => {
			if (!oldData) return oldData;

			const newPages = oldData.pages.map((page) => {
				const newPage = {
					...page,
					data: page.data.map((message) => {
						const foundMessage = responseData.messages.find(
							(m) => m.messageId === message.messageId
						);

						if (foundMessage) {
							return {
								...message,
								readAt: foundMessage.readAt
							};
						}

						return message;
					})
				};

				return newPage;
			});

			return {
				pageParams: oldData.pageParams,
				pages: newPages
			};
		}
	);
}
