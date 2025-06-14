import { Schema } from "mongoose";
import { ICliente } from "../interfaces/ICliente";

export const SchemaCliente = new Schema<ICliente>({
    _id: { type:String, required:true, unique:true },
    nombre: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    direccion: { type:String, required:true },
    password: { type:String, required:true },
    metodoPago: { type:String, enum:['Tarjeta', 'Metalico'], required:true }
})