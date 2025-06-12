import { Schema } from "mongoose";
import { IReservaCliente } from "../interfaces/IReservaCliente";

export const ServiciosExtras = new Schema({
    nombre: { type:String, required:true },
    precio: { type:Number, required:true }
})

export const SchemaReservaCliente = new Schema<IReservaCliente>({
    id: { type:String, required:true, unique:true },
    idCliente: { type:String, required:true },
    idHabitacion: { type:String, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    tipoReserva: { type:String, enum:['administracion','cliente'], required:true },
    estado: { type:String, enum: ['pendiente' , 'aceptada' , 'en curso' , 'cancelada'], required:true },
    extras: { type:ServiciosExtras, required:false },
})