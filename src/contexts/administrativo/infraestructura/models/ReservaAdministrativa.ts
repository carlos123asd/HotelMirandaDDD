import { model } from "mongoose";
import { SchemaReserva } from "../schema/SchemaReservaAdministrativa";
import { IReserva } from "../interfaces/IReserva";

export const MReserva = model<IReserva>('ReservaAdministrativa',SchemaReserva)