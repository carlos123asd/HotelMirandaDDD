import { Schema } from "mongoose";
import { IReservaAdministrativa } from "../interfaces/IReservaAdministrativa";
import { SchemaCliente } from "../../../cliente/infraestructura/schema/SchemaCliente";
import { SchemaHabitacion } from "./SchemaHabitacion";
import { SchemaEmpleado } from "./SchemaEmpleado";
import { SchemaNotasInternas } from "./SchemaNotasInternas";

export const SchemaExtras = new Schema({
    nombre: { type:String, require:true },
    precio: { type:Number, require:true }
})

export const SchemaReservaAdministrativa: Schema<IReservaAdministrativa> = new Schema<IReservaAdministrativa>({
    _id: { type:String, required:true, unique:true },
    estado: { type:String, enum:['pendiente', 'aceptada', 'en curso', 'cancelada'], required:true },
    asignacion: { type:SchemaCliente, required:true },
    habitacion: { type:SchemaHabitacion, required:true },
    checkIn: { type:Date, required:true },
    checkOut: { type:Date, required:true },
    responsable: { type:SchemaEmpleado, required:true },
    extras: { type:[SchemaExtras], required:false },
    notasInternas: { type:SchemaNotasInternas, required:false },
})