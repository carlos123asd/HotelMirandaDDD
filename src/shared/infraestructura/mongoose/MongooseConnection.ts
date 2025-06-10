import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export class MongooseConnection{
    private static instance: typeof mongoose
    private static uri:string = process.env?.URI_DB ?? "";

    static async connect():Promise<typeof mongoose>{
        if(!this.instance){
            this.instance = await mongoose.connect(this.uri)
            console.log('Mongo connected')
        }
        return this.instance
    }

    static async disconnect():Promise<void>{
        if(this.instance){
            await this.instance.disconnect();
            console.log('Mongo disconnected')
        }
    }
}