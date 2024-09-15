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

export enum STATUS {
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE'
}

export enum TYPING {
	TYPING = 'TYPING',
	NOT_TYPING = 'NOT_TYPING'
}
