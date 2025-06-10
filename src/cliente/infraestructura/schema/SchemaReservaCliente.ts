import { Schema } from "mongoose";
import { IReservaCliente } from "../interfaces/IReservaCliente";
import { SchemaCliente } from "./SchemaCliente";
import { SchemaHabitacion } from "../../../administrativo/infraestructura/schema/SchemaHabitacion";

export const ServiciosExtras = new Schema({
    nombre: { type:String, required:true },
    precio: { type:Number, required:true }
})

export const SchemaReservaCliente = new Schema<IReservaCliente>({
    id: { type:String, required:true, unique:true },
    asignacion: { type:SchemaCliente, required:true },
    habitacion: { type:SchemaHabitacion, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    extras: { type:ServiciosExtras, required:false },
})