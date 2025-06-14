import { HydratedDocument } from "mongoose";
import { Cliente } from "../../dominio/agregados/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { ClienteModelo } from "../models/ClienteModelo";

export class ClienteMapper{
    static desdeDocumento(doc:HydratedDocument<ICliente>):Cliente{
        return Cliente.crearDesdePersistencia({
            id:doc._id.toString(),
            nombre:doc.nombre,
            email:doc.email,
            direccion:doc.direccion,
            password:doc.password,
            metodoPago:doc.metodoPago
        })
    }
    static aDocumento(cliente:Cliente){
        const doc:Partial<ICliente> = {
            _id:cliente.id.toString(),
            nombre:cliente.nombre,
            email:cliente.email,
            direccion:cliente.direccion,
            password:cliente.password,
            metodoPago:cliente.metodoPago
        }
        return new ClienteModelo(doc)
    }
}