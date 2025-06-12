import { HydratedDocument } from "mongoose";
import { Cliente } from "../../dominio/agregados/Cliente";
import { ICliente } from "../interfaces/ICliente";

export class ClienteMapper{
    static desdeDocumento(doc:HydratedDocument<ICliente>):Cliente{
        return new Cliente(
            doc._id.toString(),
            doc.nombre,
            doc.email,
            doc.direccion,
            doc.password,
            doc.metodoPago
        )
    }
}