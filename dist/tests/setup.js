"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongo;
//Son metodos de jest que se ejecutan antes de todas las pruebas
beforeAll(async () => {
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose_1.default.connect(uri);
    console.log('Connected to MongoDB in memory');
});
// Son metodos de jest que se ejecutan despues de cada prueba it o test individual
afterEach(async () => {
    const collections = await mongoose_1.default.connection.db?.collections();
    if (collections) {
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    }
});
// Son metodos de jest que se ejecutan despues de todas las pruebas
afterAll(async () => {
    await mongoose_1.default.connection.close();
    await mongo.stop();
});
