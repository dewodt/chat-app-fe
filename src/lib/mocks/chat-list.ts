export interface ChatList {
	id: number;
	avatar: string;
	title: string;
	preview: string;
	datetime: Date;
	unreadCount: number;
}

export const mockChatList: ChatList[] = [
	{
		id: 1,
		avatar: 'https://randomuser.me/api/portraits/men/0.jpg',
		title: 'Alice Smith',
		preview: 'Are you coming to the party?',
		datetime: new Date(2024, 6, 18, 10, 30), // July 18, 2024, 10:30 AM
		unreadCount: 3
	},
	{
		id: 2,
		avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		title: 'Bob Johnson',
		preview: "Don't forget the meeting tomorrow",
		datetime: new Date(2024, 6, 17), // July 17, 2024 (Yesterday)
		unreadCount: 0
	},
	{
		id: 3,
		avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
		title: 'Carol Williams',
		preview: 'Can we reschedule our call?',
		datetime: new Date(2024, 6, 2), // July 2, 2024
		unreadCount: 1
	},
	{
		id: 4,
		avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
		title: 'David Brown',
		preview: "I'll send you the files later",
		datetime: new Date(2024, 6, 15), // July 15, 2024 (Monday)
		unreadCount: 2
	},
	{
		id: 5,
		avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
		title: 'Eve Davis',
		preview: "Let's catch up soon!",
		datetime: new Date(2024, 6, 18, 12, 45), // July 18, 2024, 12:45 PM
		unreadCount: 5
	},
	{
		id: 6,
		avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
		title: 'Frank Miller',
		preview: 'Where are you now?',
		datetime: new Date(2024, 6, 3), // July 3, 2024
		unreadCount: 0
	},
	{
		id: 7,
		avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
		title: 'Grace Wilson',
		preview: 'I need your help with this',
		datetime: new Date(2024, 6, 16), // July 16, 2024 (Tuesday)
		unreadCount: 1
	},
	{
		id: 8,
		avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
		title: 'Hank Moore',
		preview: 'Good morning!',
		datetime: new Date(2024, 6, 18, 9, 0), // July 18, 2024, 9:00 AM
		unreadCount: 3
	},
	{
		id: 9,
		avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
		title: 'Ivy Taylor',
		preview: 'Did you receive my email?',
		datetime: new Date(2024, 6, 2), // July 2, 2024
		unreadCount: 2
	},
	{
		id: 10,
		avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
		title: 'Jack Anderson',
		preview: 'Hello, how are you?',
		datetime: new Date(2024, 6, 18, 11, 15), // July 18, 2024, 11:15 AM
		unreadCount: 4
	},
	{
		id: 11,
		avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
		title: 'Kara Thomas',
		preview: 'Are you coming to the party?',
		datetime: new Date(2024, 6, 17), // July 17, 2024 (Yesterday)
		unreadCount: 1
	},
	{
		id: 12,
		avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
		title: 'Liam Jackson',
		preview: "Don't forget the meeting tomorrow",
		datetime: new Date(2024, 6, 15), // July 15, 2024 (Monday)
		unreadCount: 5
	},
	{
		id: 13,
		avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
		title: 'Mona White',
		preview: 'Can we reschedule our call?',
		datetime: new Date(2024, 6, 2), // July 2, 2024
		unreadCount: 3
	},
	{
		id: 14,
		avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
		title: 'Nate Harris',
		preview: "I'll send you the files later",
		datetime: new Date(2024, 6, 18, 11, 30), // July 18, 2024, 11:30 AM
		unreadCount: 0
	},
	{
		id: 15,
		avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
		title: 'Olivia Martin',
		preview: "Let's catch up soon!",
		datetime: new Date(2024, 6, 17), // July 17, 2024 (Yesterday)
		unreadCount: 2
	},
	{
		id: 16,
		avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
		title: 'Paul Thompson',
		preview: 'Where are you now?',
		datetime: new Date(2024, 6, 18, 12, 0), // July 18, 2024, 12:00 PM
		unreadCount: 4
	},
	{
		id: 17,
		avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
		title: 'Quinn Garcia',
		preview: 'I need your help with this',
		datetime: new Date(2024, 6, 16), // July 16, 2024 (Tuesday)
		unreadCount: 1
	},
	{
		id: 18,
		avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
		title: 'Rita Martinez',
		preview: 'Good morning!',
		datetime: new Date(2024, 6, 18, 9, 30), // July 18, 2024, 9:30 AM
		unreadCount: 2
	},
	{
		id: 19,
		avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
		title: 'Steve Robinson',
		preview: 'Did you receive my email?',
		datetime: new Date(2024, 6, 3), // July 3, 2024
		unreadCount: 0
	},
	{
		id: 20,
		avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
		title: 'Tina Clark',
		preview: 'Hello, how are you?',
		datetime: new Date(2024, 6, 18, 10, 0), // July 18, 2024, 10:00 AM
		unreadCount: 3
	},
	{
		id: 21,
		avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
		title: 'Uma Rodriguez',
		preview: 'Are you coming to the party?',
		datetime: new Date(2024, 6, 2), // July 2, 2024
		unreadCount: 1
	},
	{
		id: 22,
		avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
		title: 'Victor Lewis',
		preview: "Don't forget the meeting tomorrow",
		datetime: new Date(2024, 6, 17), // July 17, 2024 (Yesterday)
		unreadCount: 4
	},
	{
		id: 23,
		avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
		title: 'Wendy Lee',
		preview: 'Can we reschedule our call?',
		datetime: new Date(2024, 6, 18, 11, 45), // July 18, 2024, 11:45 AM
		unreadCount: 0
	},
	{
		id: 24,
		avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
		title: 'Xander Walker',
		preview: "I'll send you the files later",
		datetime: new Date(2024, 6, 3), // July 3, 2024
		unreadCount: 2
	},
	{
		id: 25,
		avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
		title: 'Yara Hall',
		preview: "Let's catch up soon!",
		datetime: new Date(2024, 6, 18, 12, 15), // July 18, 2024, 12:15 PM
		unreadCount: 3
	}
].sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
