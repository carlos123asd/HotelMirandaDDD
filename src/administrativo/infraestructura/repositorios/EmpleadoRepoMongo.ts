import { Empleado, StatusType } from "../../dominio/agregados/Empleado";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { Permiso } from "../../dominio/value-objects/Permiso";
import { Rol } from "../../dominio/value-objects/Rol";
import { MEmpleado } from "../models/EmpleadoModelo";

export class EmpleadoRepoMongo implements IEmpleadoRepo{
    private checkStatusType = (value:string) => {
        switch(value){
            case 'activo': return StatusType.ACTIVO;
            case 'inactivo': return StatusType.INACTIVO;
            case 'suspendido': return StatusType.SUSPENDIDO;
            default: throw new Error('Status inválido');
        }
    }
    async guardar(empleado: Empleado):Promise<void> {
        const doc = new MEmpleado(empleado)
        await doc.save();
    }
    async buscarPorId(id: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findById(id)
        if(!doc){
            return null
        }
        return new Empleado(
                doc._id?.toString(),
                doc.email,
                doc.photo,
                doc.startDate,
                doc.telefono,
                doc.codigo,
                doc.nombre,
                doc.password,
                Rol.fromString(doc.rol),
                this.checkStatusType(doc.status),
                Permiso.fromPrimitive(doc.permisosExtra),
            )
    }
    async buscarPorEmail(email: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findOne({ email: email })
        if(!doc){
            return null
        }
        return new Empleado(
                doc._id?.toString(),
                doc.email,
                doc.photo,
                doc.startDate,
                doc.telefono,
                doc.codigo,
                doc.nombre,
                doc.password,
                Rol.fromString(doc.rol),
                this.checkStatusType(doc.status),
                Permiso.fromPrimitive(doc.permisosExtra),
            )   
    }
    async buscarPorCodigo(codigo: string): Promise<Empleado | null> {
        const doc = await MEmpleado.findOne({ codigo: codigo })
        if(!doc){
            return null
        }
        return new Empleado(
                doc._id?.toString(),
                doc.email,
                doc.photo,
                doc.startDate,
                doc.telefono,
                doc.codigo,
                doc.nombre,
                doc.password,
                Rol.fromString(doc.rol),
                this.checkStatusType(doc.status),
                Permiso.fromPrimitive(doc.permisosExtra),
            )
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