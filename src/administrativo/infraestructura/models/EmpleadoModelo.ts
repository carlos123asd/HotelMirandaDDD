import { model } from "mongoose";
import { empleadoSchema } from "../schema/SchemaEmpleado";
import IEmpleado from "../interfaces/IEmpleado";

export const Empleado = model<IEmpleado>('Empleado',empleadoSchema)