import { model } from "mongoose"
import IHabitacion from "../interfaces/IHabitacion"
import { SchemaHabitacion } from "../schema/SchemaHabitacion";

export const Habitacion = model<IHabitacion>('Habitacion',SchemaHabitacion);