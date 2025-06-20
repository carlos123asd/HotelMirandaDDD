import { Request, Response } from "express";
import { CrearReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearReserva";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { ReservaMapper } from "../../contexts/administrativo/infraestructura/mappers/ReservaMapper";
import { NotasInternasRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";
import { ModificarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarReserva";
import { EliminarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarReserva";
import { BuscarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarReserva";
import { ReservaRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ReservaRepoMongo";

export class  ReservaController{
    private static construirRepos() {
            const empleado = new EmpleadoRepoMongo()
            const habitacion = new HabitacionRepoMongo()
            const cliente = new ClienteRepoMongo()
            const reserva = new ReservaRepoMongo(cliente, habitacion, empleado)
            const notas = new NotasInternasRepoMongo(empleado, reserva, habitacion, cliente)
            reserva.setNotasInternasRepo(notas)
            return { empleado, habitacion, cliente, reserva, notas }
    }
    //Admin
    static async crearReservaAdmin(req:Request,res:Response):Promise<void>{
       const {responsable,reserva,recargo} = req.body
       try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new CrearReserva(repo.reserva)
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const reservaObj = await ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            },reserva)
            await casoDeUso.ejecutar(responsableObj,reservaObj,recargo)
            res.status(201).json({ message: "Reserva creada correctamente" })
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }

    static async modificarReservaAdmin(req:Request,res:Response):Promise<void>{
        const {responsable,reserva} = req.body
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new ModificarReserva(repo.reserva)
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const reservaObj = await ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            },reserva)
        await casoDeUso.ejecutar(responsableObj,reservaObj)
        res.status(201).json({ message: "Reserva modificada correctamente" })
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }

    static async eliminarReservaAdmin(req:Request,res:Response):Promise<void>{
        const {responsable,reserva} = req.body
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new EliminarReserva(repo.reserva)
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const reservaObj = await ReservaMapper.desdeDocumento({
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
        },reserva)
        await casoDeUso.ejecutar(responsableObj,reservaObj)
        res.status(201).json({ message: "Reserva eliminada correctamente" })
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
            const repo = ReservaController.construirRepos()
            const casoDeUso = new BuscarReserva(repo.reserva)
            const reserva = await casoDeUso.buscarPorId(id)
            res.status(201).json(reserva)
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }
    static async buscarPorCliente(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new BuscarReserva(repo.reserva)
            const reservas = await casoDeUso.buscarPorCliente(id)
            res.status(201).json(reservas)
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }
    static async buscarPorHabitacion(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new BuscarReserva(repo.reserva)
            const reservas = await casoDeUso.buscarPorHabitacion(id)
            res.status(201).json(reservas)
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }
    //cliente
}