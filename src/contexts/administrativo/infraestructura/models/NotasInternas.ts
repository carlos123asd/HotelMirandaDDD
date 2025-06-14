import { model } from "mongoose";
import { INotasInternas } from "../interfaces/INotasInternas";
import { SchemaNotasInternas } from "../schema/SchemaNotasInternas";

export const MNotasInternas = model<INotasInternas>('NotasInternas',SchemaNotasInternas);