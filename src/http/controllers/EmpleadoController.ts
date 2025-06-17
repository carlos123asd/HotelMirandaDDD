import { Request, Response } from "express";
import { CrearEmpleado } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearEmpleado";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";

export class EmpleadoController{
    static async crearEmpleado(req:Request,res:Response):Promise<void>{
        const {responsable,nuevoEmpleado} = req.body
        try{
            const repoMongoEmpleado = new EmpleadoRepoMongo()
            const casoDeUso = new CrearEmpleado(repoMongoEmpleado)
            await casoDeUso.ejecutar(responsable,nuevoEmpleado)
        }catch(err){
            res.status(400).json({ error: err })
        }
    }
}