export interface User {
	id: string;
	username: string;
	name: string;
	avatarUrl: string | null;
	about: string;
}

export type ProfileData = User;
