import { model } from "mongoose";
import { SchemaEmpleado } from "../schema/SchemaEmpleado";
import IEmpleado from "../interfaces/IEmpleado";

export const MEmpleado = model<IEmpleado>('Empleado',SchemaEmpleado)