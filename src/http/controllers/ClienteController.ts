import { Request, Response } from "express";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { CrearCliente } from "../../contexts/cliente/aplicacion/casos-de-uso/CrearCliente";
import { ClienteMapper } from "../../contexts/cliente/infraestructura/mappers/ClienteMapper";
import { ModificaCliente } from "../../contexts/cliente/aplicacion/casos-de-uso/ModificarCliente";
import { EliminarCliente } from "../../contexts/cliente/aplicacion/casos-de-uso/EliminarCliente";
import { BuscarCliente } from "../../contexts/cliente/aplicacion/casos-de-uso/BuscarCliente";

export class ClienteController{
    static async crearCliente(req:Request,res:Response):Promise<void>{
        const {nuevoCliente} = req.body
        try{
            const repoMongoCliente = new ClienteRepoMongo()
            const casoDeUso = new CrearCliente(repoMongoCliente)
            const nuevoClienteDomain = ClienteMapper.desdeDocumento(nuevoCliente);
            await casoDeUso.ejecutar(nuevoClienteDomain)
            res.status(201).json({ mensaje: 'Cliente creado correctamente' })
        }catch(err){
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: String(err) });
            }
        }
    }
    static async modificarCliente(req:Request,res:Response):Promise<void>{
        const {clienteMod} = req.body
        try {
            const repoMongoCliente = new ClienteRepoMongo()
            const clienteModObj = ClienteMapper.desdeDocumento(clienteMod)
            const casoDeUso = new ModificaCliente(repoMongoCliente)
            await casoDeUso.ejecutar(clienteModObj)
            res.status(201).json({ mensaje: 'Cliente modificado correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }
    static async eliminarCliente(req:Request,res:Response):Promise<void>{
        const {cliente} = req.body
        try {
            const repoMongoCliente = new ClienteRepoMongo()
            const clienteModObj = ClienteMapper.desdeDocumento(cliente)
            const casoDeUso = new EliminarCliente(repoMongoCliente)
            await casoDeUso.ejecutar(clienteModObj)
            res.status(201).json({ mensaje: 'Cliente eliminado correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }

    static async buscarPorId(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const repoMongoCliente = new ClienteRepoMongo()
            const casoDeUso = new BuscarCliente(repoMongoCliente)
            const cliente = await casoDeUso.buscarPorId(id)
            res.status(201).json(cliente)
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }   
    }
    static async buscarPorEmail(req:Request,res:Response):Promise<void>{
        const {email} = req.params
        try {
            const repoMongoCliente = new ClienteRepoMongo()
            const casoDeUso = new BuscarCliente(repoMongoCliente)
            const cliente = await casoDeUso.buscarPorEmail(email)
            res.status(201).json(cliente)
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }  
    }
}