export interface User {
	id: string;
	username: string;
	name: string;
	avatarUrl: string | null;
	about: string | null;
}

export type ProfileData = User;
