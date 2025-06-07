import { model } from "mongoose";
import { SchemaEmpleado } from "../schema/SchemaEmpleado";
import IEmpleado from "../interfaces/IEmpleado";

export const Empleado = model<IEmpleado>('Empleado',SchemaEmpleado)