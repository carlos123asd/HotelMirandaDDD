import { Empleado, StatusType } from "../../dominio/agregados/Empleado";
import { Permiso } from "../../dominio/value-objects/Permiso";
import { Rol } from "../../dominio/value-objects/Rol";
import { HydratedDocument } from "mongoose";
import IEmpleado from "../interfaces/IEmpleado";
import { MEmpleado } from "../models/EmpleadoModelo";

export class EmpleadoMapper{
    private static checkStatusType = (value:string) => {
            switch(value){
                case 'activo': return StatusType.ACTIVO;
                case 'inactivo': return StatusType.INACTIVO;
                case 'suspendido': return StatusType.SUSPENDIDO;
                default: throw new Error('Status inválido');
            }
    }
    static desdeDocumento(doc:HydratedDocument<IEmpleado>):Empleado{
        return new Empleado(
            doc.id,
            doc.email,
            doc.photo,
            doc.startDate,
            doc.telefono,
            doc.codigo,
            doc.nombre,
            doc.password,
            Rol.fromString(doc.rol),
            this.checkStatusType(doc.status),
            doc.permisosExtra ? Permiso.fromPrimitive(doc.permisosExtra) : null,
        )   
    }
    //Inverso de objeto dominio o agregado a Documento Mongo
    static async aDocumento(dto:Empleado){
        const doc:Partial<IEmpleado> = {
            _id: dto.id,
            email: dto.email,
            photo: dto.photo,
            startDate: dto.startDate,
            telefono: dto.telefono,
            codigo: dto.codigo,
            nombre: dto.nombre,
            password: dto.password,
            rol: dto.rol.codigo,
            status: dto.status,
            permisosExtra: dto.permisosExtra ? Permiso.toPrimitive(dto.permisosExtra) : [],
        }
        return new MEmpleado(doc)
    }

    static arrayDocumento(doc:HydratedDocument<IEmpleado>[]):Empleado[]{
            return doc.map((empleado:HydratedDocument<IEmpleado>) => this.desdeDocumento(empleado)) 
    }
}