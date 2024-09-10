import { differenceInDays } from 'date-fns';

export const getFormattedTime = (datetime: Date): string => {
	return new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric'
	}).format(datetime);
};

export const getRelativeTime = (datetime: Date): string => {
	// Get now
	const now = new Date();

	if (differenceInDays(now, datetime) === 0) {
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: 'numeric'
		}).format(datetime);
	} else if (differenceInDays(now, datetime) < 7) {
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'short'
		}).format(datetime);
	} else {
		return new Intl.DateTimeFormat('en-US', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric'
		}).format(datetime);
	}
};

export const getGrouppedMessageKey = (datetime: Date): string => {
	// Get now
	const now = new Date();

	if (differenceInDays(now, datetime) === 0) {
		return 'Today';
	} else if (differenceInDays(now, datetime) === 1) {
		return 'Yesterday';
	} else if (differenceInDays(now, datetime) < 7) {
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'long'
		}).format(datetime);
	} else {
		return new Intl.DateTimeFormat('en-US', {
			month: 'numeric',
			day: 'numeric',
			year: 'numeric'
		}).format(datetime);
	}
};
