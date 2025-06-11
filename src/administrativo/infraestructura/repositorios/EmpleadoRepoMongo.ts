import { Empleado } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { EmpleadoMapper } from "../mappers/EmpleadoMapper";
import { MEmpleado } from "../models/EmpleadoModelo";

export class EmpleadoRepoMongo implements IEmpleadoRepo{
    async guardar(empleado: Empleado):Promise<void> {
        const doc = EmpleadoMapper.aDocumento(empleado)
        await doc.save();
    }
    async buscarPorId(id: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findById(id)
        if(!doc){
            return null
        }
        return EmpleadoMapper.desdeDocumento(doc)
    }
    async buscarPorEmail(email: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findOne({ email: email })
        if(!doc){
            return null
        }
        return EmpleadoMapper.desdeDocumento(doc) 
    }
    async buscarPorCodigo(codigo: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findOne({ codigo: codigo })
        if(!doc){
            return null
        }
        return EmpleadoMapper.desdeDocumento(doc)
    }
    async eliminar(id: string): Promise<void> {
        try {
           const result = await MEmpleado.deleteOne({ _id: id })
           if(result.deletedCount === 0){
                throw new Error(`No se elimino ningun empleado con ID: ${id}`)
           }
        } catch (error) {
            throw new Error(`Fallo de eliminacion para empleado ${id}}`)
        }
    }
    
}