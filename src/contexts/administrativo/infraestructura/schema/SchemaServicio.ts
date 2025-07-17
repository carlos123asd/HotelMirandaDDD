import { Schema } from "mongoose";
import { IServicio } from "../interfaces/IServicio";

export const SchemaServicio: Schema<IServicio> = new Schema<IServicio>({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true }
}, {
    timestamps: true
})