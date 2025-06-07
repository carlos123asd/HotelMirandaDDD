import { model } from "mongoose";
import { INotasInternas } from "../interfaces/INotasInternas";
import { SchemaNotasInternas } from "../schema/SchemaNotasInternas";

export const NotasInternas = model<INotasInternas>('NotasInternas',SchemaNotasInternas);