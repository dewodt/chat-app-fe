import type { ChatType } from '$lib/enums/chat';

export interface Message {
	messageId: string;
	content: string | null;
	readAt: string | null;
	editedAt: string | null;
	createdAt: string;
	deletedAt: string | null;
	isCurrentUserSender: boolean;
}

export interface Chat {
	chatId: string;
	type: ChatType;
	title: string;
	avatarUrl: string | null;
}

export interface ChatInbox extends Chat {
	unreadCount: number;
	lastMessage: {
		content: string | null;
		createdAt: string;
		deletedAt: string | null;
	};
}
