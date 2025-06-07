import { model } from "mongoose";
import { ICliente } from "../interfaces/ICliente";
import { SchemaCliente } from "../schema/SchemaCliente";

export const ClienteModelo = model<ICliente>('Cliente',SchemaCliente)