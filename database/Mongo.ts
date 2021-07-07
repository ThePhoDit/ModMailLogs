import { connect, set } from 'mongoose';
import { IDatabase, LogDocument } from './IDatabase';
import { Log } from './Schema';

set('useFindAndModify', false);

if (!process.env.MONGO_URI) throw new Error('[MONGO DB] No URI provided.');

export default class Mongo implements IDatabase {
	// @ts-ignore
	private DB;
	static db: Mongo;

	private constructor() {
		this.DB = connect(process.env.MONGO_URI!, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
			.then(() => console.log('[DATABASE] Connection established.'))
			.catch((err) => console.error(`[DATABASE] Connection error:\n ${err}`));
	}

	static getDatabase(): Mongo {
		if (!this.db)
			this.db = new Mongo();
		return this.db;
	}

	async getLog(id: string): Promise<LogDocument | null> {
		return await Log.findById(id)
			.then((data: LogDocument) => data as LogDocument)
			.catch(() => null);
	}
}