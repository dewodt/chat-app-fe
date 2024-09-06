import type { ChatType } from '$lib/enums/chat';

export interface ChatInbox {
	chatId: string;
	type: ChatType;
	title: string;
	avatarUrl: string | null;
	unreadCount: number;
	lastMessage: {
		content: string;
		createdAt: Date;
		deletedAt: Date | null;
	};
}

export interface Message {
	messageId: string;
	content: string;
	editedAt: Date | null;
	readAt: Date | null;
	createdAt: Date;
	deletedAt: Date | null;
}
