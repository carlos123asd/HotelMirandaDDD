import { Request, Response } from "express";
import { CrearEmpleado } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearEmpleado";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";
import { ModificarEmpleado } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarEmpleado";

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

    static async modificarEmpleado(req:Request,res:Response):Promise<void>{
        const {responsable,empleadoMod} = req.body
        try {
            const repoMongoEmpleado = new EmpleadoRepoMongo()
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const empleadoModObj = EmpleadoMapper.desdeDocumento(empleadoMod)
            const casoDeUso = new ModificarEmpleado(repoMongoEmpleado)
            await casoDeUso.ejecutar(responsableObj,empleadoModObj,true)
            res.status(201).json({ mensaje: 'Empleado modificado correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }

    static async eliminarEmpleado(req:Request,res:Response):Promise<void>{

    }

    static async buscarPorID(req:Request,res:Response):Promise<void>{

    }
    static async buscarPorEmail(req:Request,res:Response):Promise<void>{

    }
    static async buscarPorCodigo(req:Request,res:Response):Promise<void>{

    }
}