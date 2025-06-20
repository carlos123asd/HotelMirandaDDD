import { model } from "mongoose";
import { SchemaReserva } from "../schema/SchemaReserva";
import { IReserva } from "../interfaces/IReserva";

export const MReserva = model<IReserva>('Reserva',SchemaReserva)