import { CrearServicio } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearServicio";
import { EliminarServicio } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarServicio";
import { ModificarServicio } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarServicio";
import { ServicioMapper } from "../../contexts/administrativo/infraestructura/mappers/ServicioMapper";
import { ServicioRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ServicioRepoMongo";
import { Request, Response } from "express";
import { BuscarCliente } from "../../contexts/cliente/aplicacion/casos-de-uso/BuscarCliente";
import { BuscaServicio } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarServicio";

export class ServicioController {
    static async crearServicio(req:Request,res:Response):Promise<void>{
        const {nuevoServicio} = req.body
        try{
            const repoMongoServicio = new ServicioRepoMongo()
            const casoDeUso = new CrearServicio(repoMongoServicio)
            const nuevoEmpleadoDomain = ServicioMapper.desdeDocumento(nuevoServicio);
            await casoDeUso.ejecutar(nuevoEmpleadoDomain)
            res.status(201).json({ mensaje: 'Servicio creado correctamente' })
        }catch(err){
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: String(err) });
            }
        }
    }

    static async modificarServicio(req:Request,res:Response):Promise<void>{
        const {servicio} = req.body
        try {
            const repoMongoServicio = new ServicioRepoMongo()
            const servicioModObj = ServicioMapper.desdeDocumento(servicio)
            const casoDeUso = new ModificarServicio(repoMongoServicio)
            await casoDeUso.ejecutar(servicioModObj)
            res.status(201).json({ mensaje: 'Servicio modificado correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }

    static async eliminarServicio(req:Request,res:Response):Promise<void>{
        const {servicio} = req.body
        try {
            const repoMongoServicio = new ServicioRepoMongo()
            const servicioDel = ServicioMapper.desdeDocumento(servicio)
            const casoDeUso = new EliminarServicio(repoMongoServicio)
            await casoDeUso.ejecutar(servicioDel)
            res.status(201).json({ mensaje: "Servicio eliminado correctamente" })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }

    static async buscarPorID(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const repoMongoServicio = new ServicioRepoMongo()
            const casoDeUso = new BuscaServicio(repoMongoServicio)
            const servicioEncontrado = await casoDeUso.obtenerPorId(id)
            res.status(201).json(servicioEncontrado)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }

    static async buscarTodosServicios(req:Request,res:Response):Promise<void>{
        try {
            const repoMongoServicio = new ServicioRepoMongo()
            const casoDeUso = new BuscaServicio(repoMongoServicio)
            const servicios = await casoDeUso.obtenerTodos()
            res.status(201).json(servicios)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
}