"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MongooseConnection {
    static async connect() {
        if (!this.instance) {
            this.instance = await mongoose_1.default.connect(this.uri);
            console.log('Mongo connected');
        }
        return this.instance;
    }
    static async disconnect() {
        if (this.instance) {
            await this.instance.disconnect();
            console.log('Mongo disconnected');
        }
    }
}
exports.MongooseConnection = MongooseConnection;
MongooseConnection.uri = process.env?.URI_DB ?? "";
