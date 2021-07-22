import { Schema, model } from 'mongoose';

const user = {
	id: {
		type: String,
		required: true,
		index: true
	},
	username: {
		type: String,
		required: true
	},
	discriminator: {
		type: String,
		required: true
	},
	avatarURL: {
		type: String,
		required: true
	}
};

const message = {
	timestamp: {
		type: Date,
		required: true
	},
	id: {
		type: String,
		required: true
	},
	complementaryID: {
		type: String
	},
	type: {
		type: String,
		required: true
	},
	author: {
		type: user,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	originalContent: {
		type: String
	},
	attachments: {
		type: [String],
		required: true,
		default: []
	}
};

const log = new Schema({
	open: {
		type: Boolean,
		required: true
	},
	botID: {
		type: String,
		required: true
	},
	guildID: {
		type: String,
		required: true
	},
	channelID: {
		type: String,
		required: true,
		index: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date()
	},
	closedAt: {
		type: Date
	},
	recipient: {
		type: user,
		required: true
	},
	creator: {
		type: user,
		required: true
	},
	closer: {
		type: user
	},
	messages: {
		type: [message],
		required: true,
		default: []
	},
	nsfw: {
		type: Boolean,
		required: true,
		default: false
	},
	title: {
		type: String
	},
	note: {
		type: String
	},
	subscriptions: {
		type: [String],
		required: true,
		default: []
	}
});

export const Log = model('log', log, 'logs');