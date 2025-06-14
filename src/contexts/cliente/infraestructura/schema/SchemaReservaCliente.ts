import { Schema } from "mongoose";
import { IReservaCliente } from "../interfaces/IReservaCliente";

export const SchemaReservaCliente = new Schema<IReservaCliente>({
    _id: { type:String, required:true, unique:true },
    idCliente: { type:String, required:true },
    idHabitacion: { type:String, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    tipoReserva: { type:String, enum:['administracion','cliente'], required:true },
    estadoReserva: { type:String, enum: ['pendiente' , 'aceptada' , 'en curso' , 'cancelada'], required:true },
    extras: { type:[String], required:false },
})