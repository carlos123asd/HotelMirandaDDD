import { Schema } from "mongoose";
import { IReserva } from "../interfaces/IReserva";

export const SchemaReserva: Schema<IReserva> = new Schema<IReserva>({
    estado: { type:String, enum:['pendiente', 'aceptada', 'en curso', 'cancelada'], required:true },
    idCliente: { type:String, required:true },
    idHabitacion: { type:String, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    idEmpleado: { type:String, required:true },
    tipoReserva: { type:String, enum:['administracion','cliente'], required:true },
    totalReserva: { type:Number, required:true },
    extras: { type:[String], required:false },
    idNotasInternas: { type:[String], required:false },
})