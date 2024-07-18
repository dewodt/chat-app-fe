export interface User {
	id: string;
	avatar: string;
	username: string;
	name: string;
	about: string;
}

export const mockUsers: User[] = [
	{
		id: 'user1',
		avatar: 'https://example.com/avatars/user1.jpg',
		username: 'john_doe',
		name: 'John Doe',
		about: 'Passionate photographer and nature enthusiast.'
	},
	{
		id: 'user2',
		avatar: 'https://example.com/avatars/user2.jpg',
		username: 'jane_smith',
		name: 'Jane Smith',
		about: 'Software engineer by day, novelist by night.'
	},
	{
		id: 'user3',
		avatar: 'https://example.com/avatars/user3.jpg',
		username: 'bob_johnson',
		name: 'Bob Johnson',
		about: 'Fitness coach and nutrition expert.'
	},
	{
		id: 'user4',
		avatar: 'https://example.com/avatars/user4.jpg',
		username: 'alice_williams',
		name: 'Alice Williams',
		about: 'Travel blogger exploring hidden gems around the world.'
	},
	{
		id: 'user5',
		avatar: 'https://example.com/avatars/user5.jpg',
		username: 'charlie_brown',
		name: 'Charlie Brown',
		about: 'Aspiring chef with a love for fusion cuisine.'
	},
	{
		id: 'user6',
		avatar: 'https://example.com/avatars/user6.jpg',
		username: 'emma_davis',
		name: 'Emma Davis',
		about: 'Environmental scientist working on sustainable solutions.'
	},
	{
		id: 'user7',
		avatar: 'https://example.com/avatars/user7.jpg',
		username: 'frank_miller',
		name: 'Frank Miller',
		about: 'Vintage car collector and restoration enthusiast.'
	},
	{
		id: 'user8',
		avatar: 'https://example.com/avatars/user8.jpg',
		username: 'grace_lee',
		name: 'Grace Lee',
		about: 'Classical pianist and music teacher.'
	},
	{
		id: 'user9',
		avatar: 'https://example.com/avatars/user9.jpg',
		username: 'henry_wilson',
		name: 'Henry Wilson',
		about: 'Tech startup founder focused on AI innovations.'
	},
	{
		id: 'user10',
		avatar: 'https://example.com/avatars/user10.jpg',
		username: 'isabel_garcia',
		name: 'Isabel Garcia',
		about: 'Professional dancer and choreographer.'
	}
];
