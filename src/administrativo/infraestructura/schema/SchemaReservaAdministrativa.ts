import { Schema } from "mongoose";
import { IReservaAdministrativa } from "../interfaces/IReservaAdministrativa";

export const SchemaExtras = new Schema({
    nombre: { type:String, require:true },
    precio: { type:Number, require:true }
})

export const SchemaReservaAdministrativa: Schema<IReservaAdministrativa> = new Schema<IReservaAdministrativa>({
    _id: { type:String, required:true, unique:true },
    estado: { type:String, enum:['pendiente', 'aceptada', 'en curso', 'cancelada'], required:true },
    idCliente: { type:String, required:true },
    idHabitacion: { type:String, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    idEmpleado: { type:String, required:true },
    tipoReserva: { type:String, enum:['administracion','cliente'], required:true },
    extras: { type:[String], required:false },
    idNotasInternas: { type:String, required:false },
})