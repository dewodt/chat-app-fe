export interface Message {
	id: string;
	message: string;
	datetime: Date;
	isRead: boolean;
	isMine: boolean;
}

export const mockChat: Message[] = [
	{
		id: 'msg1',
		message: "Hey there! How's your day going?",
		datetime: new Date('2024-07-18T09:00:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg2',
		message: "Hi! It's going well, thanks. How about yours?",
		datetime: new Date('2024-07-18T09:02:30Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg3',
		message: 'Pretty good! Just finished a big project at work.',
		datetime: new Date('2024-07-18T09:05:15Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg4',
		message: "That's great! Congratulations on finishing the project.",
		datetime: new Date('2024-07-18T09:07:45Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg5',
		message: "Thanks! It was a lot of work, but I'm glad it's done.",
		datetime: new Date('2024-07-18T09:10:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg6',
		message: 'You deserve a break. Any plans for the weekend?',
		datetime: new Date('2024-07-18T09:12:30Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg7',
		message: 'Not yet. Maybe we could grab coffee and catch up?',
		datetime: new Date('2024-07-18T09:15:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg8',
		message: 'Sounds perfect! How about Saturday afternoon?',
		datetime: new Date('2024-07-18T09:17:30Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg9',
		message: 'Saturday works for me. 2 PM at our usual spot?',
		datetime: new Date('2024-07-18T09:20:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg10',
		message: "Great! I'll see you then.",
		datetime: new Date('2024-07-18T09:22:30Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg11',
		message: 'Looking forward to it!',
		datetime: new Date('2024-07-18T09:25:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg12',
		message: 'By the way, have you seen the new movie that just came out?',
		datetime: new Date('2024-07-18T10:00:00Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg13',
		message: "Not yet, but I've heard good things about it. Have you?",
		datetime: new Date('2024-07-18T10:05:30Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg14',
		message: 'Yeah, I saw it last night. It was amazing!',
		datetime: new Date('2024-07-18T10:08:45Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg15',
		message: 'Oh, cool! Maybe we can discuss it when we meet.',
		datetime: new Date('2024-07-18T10:12:00Z'),
		isRead: true,
		isMine: false
	},
	{
		id: 'msg16',
		message: "Definitely! I'd love to hear your thoughts on it.",
		datetime: new Date('2024-07-18T10:15:30Z'),
		isRead: true,
		isMine: true
	},
	{
		id: 'msg17',
		message: 'Sounds good. Oh, did you hear about the new café opening downtown?',
		datetime: new Date('2024-07-18T11:00:00Z'),
		isRead: false,
		isMine: false
	},
	{
		id: 'msg18',
		message: "No, I haven't! What's it called?",
		datetime: new Date('2024-07-18T11:05:15Z'),
		isRead: false,
		isMine: true
	},
	{
		id: 'msg19',
		message: "It's called 'Brew & View'. Apparently, they have a small cinema inside!",
		datetime: new Date('2024-07-18T11:10:30Z'),
		isRead: false,
		isMine: false
	},
	{
		id: 'msg20',
		message: 'That sounds amazing! We should check it out sometime.',
		datetime: new Date('2024-07-18T11:15:45Z'),
		isRead: false,
		isMine: true
	},
	{
		id: 'msg21',
		message: 'Absolutely! Maybe next weekend after our coffee meet-up?',
		datetime: new Date('2024-07-18T11:20:00Z'),
		isRead: false,
		isMine: false
	},
	{
		id: 'msg22',
		message: "Perfect! It's a plan.",
		datetime: new Date('2024-07-18T11:25:15Z'),
		isRead: false,
		isMine: true
	},
	{
		id: 'msg23',
		message: "Great! I'll look up their schedule and menu.",
		datetime: new Date('2024-07-18T11:30:30Z'),
		isRead: false,
		isMine: false
	},
	{
		id: 'msg24',
		message: 'Awesome, thanks! See you on Saturday!',
		datetime: new Date('2024-07-18T11:35:45Z'),
		isRead: false,
		isMine: true
	},
	{
		id: 'msg25',
		message: 'See you then! Have a great rest of your day!',
		datetime: new Date('2024-07-18T11:40:00Z'),
		isRead: false,
		isMine: false
	}
];
