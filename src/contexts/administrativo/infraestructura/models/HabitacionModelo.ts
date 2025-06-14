import { model } from "mongoose"
import IHabitacion from "../interfaces/IHabitacion"
import { SchemaHabitacion } from "../schema/SchemaHabitacion";

export const MHabitacion = model<IHabitacion>('Habitacion',SchemaHabitacion);