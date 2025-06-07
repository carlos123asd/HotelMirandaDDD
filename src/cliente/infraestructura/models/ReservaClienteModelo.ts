import { model } from "mongoose";
import { IReservaCliente } from "../interfaces/IReservaCliente";
import { SchemaReservaCliente } from "../schema/SchemaReservaCliente";

export const ReservaClienteModelo = model<IReservaCliente>('ReservaCliente',SchemaReservaCliente)