import { Empleado, StatusType } from "../../dominio/agregados/Empleado";
import { Permiso } from "../../dominio/value-objects/Permiso";
import { Rol } from "../../dominio/value-objects/Rol";

export class EmpleadoMapper{
    private static checkStatusType = (value:string) => {
            switch(value){
                case 'activo': return StatusType.ACTIVO;
                case 'inactivo': return StatusType.INACTIVO;
                case 'suspendido': return StatusType.SUSPENDIDO;
                default: throw new Error('Status inválido');
            }
    }
    static desdeDocumento(doc:any):Empleado{
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
}