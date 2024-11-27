import { MongoClient, Db, Collection, Document } from 'mongodb';
import logger from './logger';

class Database {
  private dbUrl: string;
  private dbName = process.env.DATABASE_NAME || 'default_user_service_db';
  private dbClient: MongoClient | null = null;
  private databaseInstance: Db | null = null;

  constructor() {
    this.dbUrl = process.env.DATABASE_URL || ''; 
  }

  public async connect(): Promise<void> {
    if (this.dbClient) {
      logger.debug('Database connection already exists');
      return;
    }

    if (!this.dbUrl) {
      throw new Error('Database URL not found');
    }

    try {
      this.dbClient = new MongoClient(this.dbUrl);

      await this.dbClient.connect();

      this.databaseInstance = this.dbClient.db(this.dbName);

      logger.info(`Connected to database: ${this.dbName}`);
    } catch (error: any) {
      logger.error('Failed to connect to database', { error: error.message });
      throw new Error('Database connection failed');
    }
  }

  public async disconnect(): Promise<void> {
    if (this.dbClient) {
      await this.dbClient.close();
      logger.info(`Disconnected from database`);
      this.dbClient = null;
      this.databaseInstance = null;
    }
  }

  /**
   * Retrieve a MongoDB collection by name.
   * @param name - The name of the collection.
   * @returns The MongoDB collection instance.
   */
  public getCollection<T extends Document>(name: string): Collection<T> {
    if (!this.databaseInstance) {
      throw new Error('Database not connected');
    }
    return this.databaseInstance.collection<T>(name);
  }
  /**
   * Checks if the database connection is active.
   * @returns `true` if connected, `false` otherwise.
   */
  public isConnected(): boolean {
    return Boolean(this.dbClient);
  }
}

export default new Database();
