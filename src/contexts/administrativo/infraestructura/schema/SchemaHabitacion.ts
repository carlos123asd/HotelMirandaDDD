import { Schema } from "mongoose"
import IHabitacion from "../interfaces/IHabitacion"

const Servicios = new Schema({
    nombre: { type:String, required:true },
    precio: { type:Number, required:true }
})

export const SchemaHabitacion = new Schema<IHabitacion>({
    _id: { type:String, required:true, unique:true },
    nombre: { type:String, required:true },
    descripcion: { type:String, required:true },
    precio: { type:Number, required:true },
    oferta: { type:Number, required:true },
    categoria: { type:String, required:true },
    servicios: { type:[Servicios], required:true },
    imagenes: { type:[String], required:true },
    piso: { type:String, required:true },
    codigo: { type:String, required:true, unique:true }
})