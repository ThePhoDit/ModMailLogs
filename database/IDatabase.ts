import { Document } from 'mongoose';

interface IDatabase {
	getLog(id: string): Promise<LogDocument | null>;
}

interface IUser {
	id: string;
	username: string;
	discriminator: string;
	avatarURL: string;
}

interface IMessage {
	timestamp: Date;
	id: string;
	complementaryID?: string;
	type: 'INTERNAL' | 'STAFF_REPLY' | 'RECIPIENT_REPLY',
	author: IUser;
	content: string;
	originalContent?: string;
	attachments: string[];
}

interface ILog {
	open: boolean;
	botID: string;
	guildID: string;
	channelID: string;
	createdAt: Date;
	closedAt?: Date;
	recipient: IUser;
	creator: IUser;
	closer?: IUser;
	messages: IMessage[];
	nsfw: boolean;
	title?: string;
	note?: string;
	subscriptions: string[];
}

type LogDocument = ILog & Document;

export {
	IDatabase,
	LogDocument
};