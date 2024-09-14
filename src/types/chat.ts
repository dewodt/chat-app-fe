import type { ChatType } from '$lib/enums/chat';

export interface Message {
	messageId: string;
	chatId: string;
	senderId: string;
	content: string | null;
	readAt: string | null;
	editedAt: string | null;
	createdAt: string;
	deletedAt: string | null;
}

export interface Chat {
	chatId: string;
	type: ChatType;
	title: string;
	avatarUrl: string | null;
}

export interface ChatInbox extends Chat {
	unreadCount: number;
	latestMessage: {
		messageId: string;
		content: string | null;
		createdAt: string;
		deletedAt: string | null;
	} | null;
}
