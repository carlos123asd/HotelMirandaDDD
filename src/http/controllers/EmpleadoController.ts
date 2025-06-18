import { Request, Response } from "express";
import { CrearEmpleado } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearEmpleado";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";

export class EmpleadoController{
    static async crearEmpleado(req:Request,res:Response):Promise<void>{
        const {responsable,nuevoEmpleado} = req.body
        
        try{
            const repoMongoEmpleado = new EmpleadoRepoMongo()
            const casoDeUso = new CrearEmpleado(repoMongoEmpleado)
            const responsableDomain = EmpleadoMapper.desdeDocumento(responsable);
            const nuevoEmpleadoDomain = EmpleadoMapper.desdeDocumento(nuevoEmpleado);
            await casoDeUso.ejecutar(responsableDomain,nuevoEmpleadoDomain)
            res.status(201).json({ mensaje: 'Empleado creado correctamente' })
        }catch(err){
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: String(err) });
            }
        }
    }
}