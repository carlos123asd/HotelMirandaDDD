import { Request, Response } from "express";
import { NotasInternasRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { ReservaAdministrativaRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ReservaAdministrativaRepoMongo";
import { ReservaClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ReservaClienteRepoMongo";
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { CrearNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearNotasInternas";
import { NotasInternasMapper } from "../../contexts/administrativo/infraestructura/mappers/NotasInternasMapper";
import { ModificarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarNotasInternas";
import { EliminarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarNotasInternas";
import { BuscarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarNotasInternas";

export class NotasInternasController{
    private static construirRepos() {
        const empleado = new EmpleadoRepoMongo()
        const habitacion = new HabitacionRepoMongo()
        const cliente = new ClienteRepoMongo()
        const reservaCliente = new ReservaClienteRepoMongo(cliente, habitacion)
        const reservaAdmin = new ReservaAdministrativaRepoMongo(cliente, habitacion, empleado)
        const notas = new NotasInternasRepoMongo(empleado, reservaAdmin, reservaCliente, habitacion, cliente)
        reservaAdmin.setNotasInternasRepo(notas)
        return { empleado, habitacion, cliente, reservaCliente, reservaAdmin, notas }
    }

    static async crearNotaInterna(req:Request,res:Response):Promise<void>{
        const {nuevaNotaInterna} = req.body
        try{
            const casoDeUso = new CrearNotasInternas(this.construirRepos().notas)
            const nuevaNotaInternaDomain = await NotasInternasMapper.desdeDocumento(nuevaNotaInterna,{
                empleadoRepo:this.construirRepos().empleado,
                clienteRepo:this.construirRepos().cliente,
                reservaClienteRepo:this.construirRepos().reservaCliente,
                reservaAdministrativaRepo:this.construirRepos().reservaAdmin,
                habitacionRepo:this.construirRepos().habitacion
            });
            await casoDeUso.ejecutar(nuevaNotaInternaDomain)
            res.status(201).json({ mensaje: 'Nota Interna creada correctamente' })
        }catch(err){
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: String(err) });
            }
        }
    }

    static async modificarNotaInterna(req:Request,res:Response):Promise<void>{
        const {notasInternasMod} = req.body
        try {
            const notasInternasModObj =  await NotasInternasMapper.desdeDocumento(notasInternasMod,{
                empleadoRepo:this.construirRepos().empleado,
                clienteRepo:this.construirRepos().cliente,
                reservaClienteRepo:this.construirRepos().reservaCliente,
                reservaAdministrativaRepo:this.construirRepos().reservaAdmin,
                habitacionRepo:this.construirRepos().habitacion
            })
            const casoDeUso = new ModificarNotasInternas(this.construirRepos().notas)
            await casoDeUso.ejecutar(notasInternasModObj)
            res.status(201).json({ mensaje: 'Nota Interna modificada correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }

    static async eliminarNotaInterna(req:Request,res:Response):Promise<void>{
        const {notaInterna} = req.body
        try {
            const notasInternasObj =  await NotasInternasMapper.desdeDocumento(notaInterna,{
                empleadoRepo:this.construirRepos().empleado,
                clienteRepo:this.construirRepos().cliente,
                reservaClienteRepo:this.construirRepos().reservaCliente,
                reservaAdministrativaRepo:this.construirRepos().reservaAdmin,
                habitacionRepo:this.construirRepos().habitacion
            })
            const casoDeUso = new EliminarNotasInternas(this.construirRepos().notas)
            await casoDeUso.ejecutar(notasInternasObj)
            res.status(201).json({ mensaje: "Nota Interna eliminada correctamente" })
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
            const casoDeUso = new BuscarNotasInternas(this.construirRepos().notas)
            const notaInternaEncontrada = await casoDeUso.buscarPorID(id)
            res.status(201).json(notaInternaEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarPorHabitacion(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const casoDeUso = new BuscarNotasInternas(this.construirRepos().notas)
            const notaInternaEncontrada = await casoDeUso.buscarPorHabitacion(id)
            res.status(201).json(notaInternaEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarPorCliente(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const casoDeUso = new BuscarNotasInternas(this.construirRepos().notas)
            const notaInternaEncontrada = await casoDeUso.buscarPorCliente(id)
            res.status(201).json(notaInternaEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarPorReserva(req:Request,res:Response):Promise<void>{
         const {id} = req.params
        try {
            const casoDeUso = new BuscarNotasInternas(this.construirRepos().notas)
            const notaInternaEncontrada = await casoDeUso.buscarPorReserva(id)
            res.status(201).json(notaInternaEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
}