import { Schema } from "mongoose";
import { INotasInternas } from "../interfaces/INotasInternas";
import { SchemaEmpleado } from "./SchemaEmpleado";
import { SchemaHabitacion } from "./SchemaHabitacion";
import { SchemaCliente } from "../../../cliente/infraestructura/schema/SchemaCliente";
import { SchemaReservaAdministrativa } from "./SchemaReservaAdministrativa";
import { SchemaReservaCliente } from "../../../cliente/infraestructura/schema/SchemaReservaCliente";

export const SchemaNotasInternas = new Schema<INotasInternas>({
    _id: { type:String, required:true },
    responsable: { type:SchemaEmpleado, required:true },
    tipo: { type:String, enum:['Habitacion', 'Cliente', 'Reserva'], required:true },
    fecha: { type:Date, required:true },
    titulo: { type:String, required:true },
    descripcion: { type:String, required:true },
    datosAgregados: { type:String, required:false },
    cliente: { type:SchemaCliente, required:false },
    reservaCliente: { type:SchemaReservaAdministrativa, required:false },
    reservaAdministrativa: { type:SchemaReservaCliente, required:false },
    habitacion: { type:SchemaHabitacion, required:false },
})