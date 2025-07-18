import { Schema } from "mongoose";
import IEmpleado from "../interfaces/IEmpleado";

const PermisoSchema = new Schema({
  codigo: { type: String, enum: ['ADM', 'GR', 'GE', 'GH'], required: true },
  nivel: { type: Number, enum: [1, 2, 3], required: true },
  descripcion: {type: String, required: true}
}, { _id: false });

export const SchemaEmpleado = new Schema<IEmpleado>({
  email: { type: String, required: true, unique:true },
  photo: {type: String, required: true},
  startDate: {type: Date, required:true},
  telefono: {type: String, require:true},
  codigo: { type: String, required: true, unique:true },
  nombre: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'staff'], required: true },
  status: {type:String, enum: ['inactivo','activo','suspendido']},
  permisosExtra: { type: [PermisoSchema], default: [] },
}, {
  timestamps: true
});
