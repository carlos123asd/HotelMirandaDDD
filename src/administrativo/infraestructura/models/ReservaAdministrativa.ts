import { model } from "mongoose";
import { SchemaReservaAdministrativa } from "../schema/SchemaReservaAdministrativa";
import { IReservaAdministrativa } from "../interfaces/IReservaAdministrativa";

export const ReservaAdministrativa = model<IReservaAdministrativa>('ReservaAdministrativa',SchemaReservaAdministrativa)