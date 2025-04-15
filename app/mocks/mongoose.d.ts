/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'mongoose' {
  export interface Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export class Schema<T = any> {
    constructor(definition: Record<string, any>, options?: Record<string, any>);
    static Types: {
      Mixed: unknown;
    };
  }

  export interface Model<T> {
    new(data: Record<string, any>): T;
    find: (query: Record<string, any>) => any;
    create: (data: Record<string, any>) => Promise<T>;
  }

  export const models: Record<string, Model<any>>;
  export function model<T>(name: string, schema: Schema<T>): Model<T>;
  
  // Add connect method for Mongoose 8
  export function connect(uri: string, options?: any): Promise<typeof mongoose>;
  
  // Add connection type
  export interface Connection {
    models: Record<string, Model<any>>;
    model<T>(name: string, schema?: Schema<T>): Model<T>;
  }
  
  // Add createConnection method
  export function createConnection(uri: string, options?: any): {
    asPromise(): Promise<Connection>;
  };
} 