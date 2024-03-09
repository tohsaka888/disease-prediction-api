import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME!;

class MongoConnector {
  private static instance: MongoConnector;
  private db: Db | null = null;
  private client: MongoClient | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): MongoConnector {
    if (!MongoConnector.instance) {
      MongoConnector.instance = new MongoConnector();
    }
    return MongoConnector.instance;
  }

  async connect(url: string, dbName: string): Promise<MongoClient | undefined> {
    if (!this.db) {
      const client = new MongoClient(url);
      await client.connect();
      this.db = client.db(dbName);
      this.client = client;
      return this.client;
    }
  }

  async getDb(): Promise<Db> {
    await this.connect(MONGO_URI, DATABASE_NAME);
    if (!this.db) {
      throw new Error("Database connection has not been established.");
    }
    return this.db;
  }

  public async disconnect(): Promise<void> {
    if (this.db) {
      this.client?.close();
    }
  }
}

export default MongoConnector.getInstance();
