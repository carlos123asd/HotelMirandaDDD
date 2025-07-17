import { model } from "mongoose";
import { IServicio } from "../interfaces/IServicio";
import { SchemaServicio } from "../schema/SchemaServicio";

export const MServicio = model<IServicio>('Servicios',SchemaServicio)