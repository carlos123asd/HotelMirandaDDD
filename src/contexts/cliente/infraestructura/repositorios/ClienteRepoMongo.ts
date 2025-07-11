import { Cliente } from "../../dominio/agregados/Cliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { ClienteMapper } from "../mappers/ClienteMapper";
import { ClienteModelo } from "../models/ClienteModelo";

export class ClienteRepoMongo implements IClienteRepo{
    async buscarTodo(): Promise<Cliente[] | null> {
        try {
            const docs = await ClienteModelo.find();
            if (!docs || docs.length === 0) {
                return null;
            }
            return ClienteMapper.arrayDocumento(docs)
        } catch (error) {
            throw new Error("Error al buscar todos los clientes");
        }
    }
    async guardar(cliente: Cliente,actualizar:boolean): Promise<void> {
        const doc = ClienteMapper.aDocumento(cliente)
        if(actualizar){
            await ClienteModelo.findByIdAndUpdate(doc._id, doc, { upsert:true, new:true })
        }else{
            await doc.save()
        }
    }
    async eliminar(id: string): Promise<void> {
        try {
             const result = await ClienteModelo.deleteOne({ _id:id })
            if(result.deletedCount === 0) throw new Error("No se elimino ningun Cliente")        
        } catch (error) {
            throw new Error("Fallo de eliminacion de cliente")
        }
    }
    async buscarPorId(id: string): Promise<Cliente | null> {
        const doc = await ClienteModelo.findById(id)
        if(!doc){
            return null
        }
        return ClienteMapper.desdeDocumento(doc)
    }
    async buscarPorEmail(email: string): Promise<Cliente | null> {
        const doc = await ClienteModelo.findOne({ email:email })
        if(!doc){
            return null
        }
        return ClienteMapper.desdeDocumento(doc)
    }
}