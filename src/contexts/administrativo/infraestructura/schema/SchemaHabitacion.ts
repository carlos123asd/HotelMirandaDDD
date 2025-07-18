import { Schema } from "mongoose"
import IHabitacion from "../interfaces/IHabitacion"

export const SchemaHabitacion = new Schema<IHabitacion>({
    nombre: { type:String, required:true },
    descripcion: { type:String, required:true },
    precio: { type:Number, required:true },
    oferta: { type:Number, required:true, max:100 },
    categoria: { type:String, required:true },
    servicios: { type:[String], required:true },
    imagenes: { type:[String], required:true },
    piso: { type:String, required:true },
    codigo: { type:String, required:true, unique:true }
},{
    timestamps: true
})