import { Schema } from "mongoose";
import { INotasInternas } from "../interfaces/INotasInternas";

export const SchemaNotasInternas = new Schema<INotasInternas>({
    tipoReserva: {type:String, enum:['cliente','administrativa'], required:false},
    idResponsable: { type:String, required:true },
    tipo: { type:String, enum:['Habitacion', 'Cliente', 'Reserva'], required:true },
    fecha: { type:Date, required:true },
    titulo: { type:String, required:true },
    descripcion: { type:String, required:true },
    datosAgregados: { type:String, required:false },
    idCliente: { type:String, required:false },
    idReserva: { type:String, required:false },
    idHabitacion: { type:String, required:false },
})