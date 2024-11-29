import {
    Collection,
    InsertOneResult,
    WithId,
    FindOptions,
    DeleteOptions,
    UpdateResult,
    OptionalUnlessRequiredId,
    Document,
    Filter,
    UpdateFilter,
    UpdateOptions,
    ObjectId,
} from 'mongodb';

import database from './database';
import { InternalError } from '@app/common';

export class Repository<T extends Document> {
    private collection: Collection<T>;

    constructor(collectionName: string) {
        this.collection = database.getCollection<T>(collectionName);
    }

    // Create document
    async create(document: Partial<T>): Promise<InsertOneResult> {
        try {
            const result = await this.collection.insertOne(document as OptionalUnlessRequiredId<T>);
            return result;
        } catch (error) {
            throw new InternalError(`Failed to create document`);
        }
    }

    // Find documents
    async find(query: Filter<T>, options?: FindOptions<T>): Promise<WithId<T>[]> {
        try {
            const result = await this.collection.find(query, options).toArray();
            return result;
        } catch (error) {
            throw new InternalError(`Failed to find documents`);
        }
    }

    // Find one document
    async findOne(query: Filter<T>, options?: FindOptions<T>): Promise<T | null> {
        try {
            const result = await this.collection.findOne(query, options);
            return result;
        } catch (error) {
            throw new InternalError(`Failed to find document`);
        }
    }

    public async findOneById(id: string): Promise<WithId<T> | null> {
        try {
            const objectId = new ObjectId(id);
            const filter: Filter<T> = { _id: objectId } as Filter<T>;

            const result = await this.collection.findOne(filter);
            return result; 
        } catch (error) {
            throw new InternalError(`Failed to find document by id`);
        }
    }

    // Update document
    async update(query: Filter<T>, update: UpdateFilter<T>, options?: UpdateOptions): Promise<boolean> {
        try {
            const result: UpdateResult = await this.collection.updateOne(query, update, options);
            return result.modifiedCount > 0;
        } catch (error) {
            throw new InternalError(`Failed to update document`);
        }
    }

    // Delete document
    async delete(query: Filter<T>, options?: DeleteOptions): Promise<boolean> {
        try {
            const result = await this.collection.deleteOne(query, options);
            return result.deletedCount > 0;
        } catch (error) {
            throw new InternalError(`Failed to delete document`);
        }
    }

    // Count documents
    async count(query: Filter<T>): Promise<number> {
        try {
            const result = await this.collection.countDocuments(query);
            return result;
        } catch (error) {
            throw new InternalError(`Failed to count documents`);
        }
    }

    // Drop indexes
    public async dropIndexes(): Promise<void> {
        try {
            await this.collection.dropIndexes();
        } catch (error) {
            throw new InternalError(`Failed to drop indexes`);
        }
    }
}
