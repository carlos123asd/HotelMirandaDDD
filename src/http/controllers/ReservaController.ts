import { Request, Response } from "express";
import { CrearReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearReserva";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { ReservaAdministrativaRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ReservaAdministrativaRepoMongo";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { ReservaAdministrativaMapper } from "../../contexts/administrativo/infraestructura/mappers/ReservaMapper";
import { NotasInternasRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo";
import { ReservaClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ReservaClienteRepoMongo";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";
import { ModificarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarReserva";
import { EliminarReserva } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarReserva";

export class  ReservaController{
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
    //Admin
    static async crearReservaAdmin(req:Request,res:Response):Promise<void>{
       const {responsable,reserva,recargo} = req.body
       try {
        const repo = ReservaController.construirRepos()
        const casoDeUso = new CrearReserva(repo.reservaAdmin)
        const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
        const reservaObj = await ReservaAdministrativaMapper.desdeDocumento({
            clienteRepo: repo.cliente,
            habitacionRepo: repo.habitacion,
            empleadoRepo: repo.empleado,
            notasInternasRepo: repo.notas
        },reserva)
        await casoDeUso.ejecutar(responsableObj,reservaObj,recargo)
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
        const casoDeUso = new ModificarReserva(repo.reservaAdmin)
        const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
        const reservaObj = await ReservaAdministrativaMapper.desdeDocumento({
            clienteRepo: repo.cliente,
            habitacionRepo: repo.habitacion,
            empleadoRepo: repo.empleado,
            notasInternasRepo: repo.notas
        },reserva)
        await casoDeUso.ejecutar(responsableObj,reservaObj)
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
        const casoDeUso = new EliminarReserva(repo.reservaAdmin)
        const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
        const reservaObj = await ReservaAdministrativaMapper.desdeDocumento({
            clienteRepo: repo.cliente,
            habitacionRepo: repo.habitacion,
            empleadoRepo: repo.empleado,
            notasInternasRepo: repo.notas
        },reserva)
        await casoDeUso.ejecutar(responsableObj,reservaObj)
       } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
       }
    }


    static async buscarPorId(req:Request,res:Response):Promise<void>{

    }
    static async buscarPorCliente(req:Request,res:Response):Promise<void>{

    }
    static async buscarPorHabitacion(req:Request,res:Response):Promise<void>{

    }
    //cliente
}