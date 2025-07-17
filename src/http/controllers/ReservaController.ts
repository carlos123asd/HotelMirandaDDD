import { Request, Response } from "express";
import { CrearReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearReserva";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { ReservaMapper } from "../../contexts/administrativo/infraestructura/mappers/ReservaMapper";
import { NotasInternasRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo";
import { ModificarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarReserva";
import { EliminarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarReserva";
import { BuscarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarReserva";
import { ReservaRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ReservaRepoMongo";
import { ServicioRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ServicioRepoMongo";

export class  ReservaController{
    private static construirRepos() {
            const servicio = new ServicioRepoMongo();
            const empleado = new EmpleadoRepoMongo()
            const habitacion = new HabitacionRepoMongo(servicio)
            const cliente = new ClienteRepoMongo()
            const reserva = new ReservaRepoMongo(servicio, cliente, habitacion, empleado)
            const notas = new NotasInternasRepoMongo(empleado, reserva, habitacion, cliente)
            reserva.setNotasInternasRepo(notas)
            return { empleado, habitacion, cliente, reserva, notas, servicio }
    }
    
    static async crearReserva(req:Request,res:Response):Promise<void>{
       const {reserva,recargo} = req.body
       try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new CrearReserva(repo.reserva)
            const reservaObj = await ReservaMapper.desdeDocumento({
                servicioRepo: repo.servicio,
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            },reserva)
            await casoDeUso.ejecutar(reservaObj,recargo)
            res.status(201).json({ message: "Reserva creada correctamente" })
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }

    static async modificarReserva(req:Request,res:Response):Promise<void>{
        const {reserva} = req.body
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new ModificarReserva(repo.reserva)
            const reservaObj = await ReservaMapper.desdeDocumento({
                servicioRepo: repo.servicio,
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
            },reserva)
        await casoDeUso.ejecutar(reservaObj)
        res.status(201).json({ message: "Reserva modificada correctamente" })
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }

    static async eliminarReserva(req:Request,res:Response):Promise<void>{
        const {reserva} = req.body
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new EliminarReserva(repo.reserva)
            const reservaObj = await ReservaMapper.desdeDocumento({
                servicioRepo: repo.servicio,
                clienteRepo: repo.cliente,
                habitacionRepo: repo.habitacion,
                empleadoRepo: repo.empleado,
                notasInternasRepo: repo.notas
        },reserva)
        await casoDeUso.ejecutar(reservaObj)
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

    static async buscarTodasReservas(req:Request,res:Response):Promise<void>{
        try {
            const repo = ReservaController.construirRepos()
            const casoDeUso = new BuscarReserva(repo.reserva)
            const reservas = await casoDeUso.buscarTodasReservas()
            res.status(201).json(reservas)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
}