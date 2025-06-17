import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo:MongoMemoryServer;

//Son metodos de jest que se ejecutan antes de todas las pruebas
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
    console.log('Connected to MongoDB in memory');
})

// Son metodos de jest que se ejecutan despues de cada prueba it o test individual
afterEach(async () => {
    const collections = await mongoose.connection.db?.collections();
    if(collections){
        for(const collection of collections) {
            await collection.deleteMany({});
        }
    }
})

// Son metodos de jest que se ejecutan despues de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop()
})