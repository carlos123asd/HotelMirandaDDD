import { Request, Response } from "express";
import { NotasInternasRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/NotasInternasRepoMongo";
import { EmpleadoRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/EmpleadoRepoMongo";
import { ReservaRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ReservaRepoMongo";
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { ClienteRepoMongo } from "../../contexts/cliente/infraestructura/repositorios/ClienteRepoMongo";
import { CrearNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearNotasInternas";
import { NotasInternasMapper } from "../../contexts/administrativo/infraestructura/mappers/NotasInternasMapper";
import { ModificarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarNotasInternas";
import { EliminarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarNotasInternas";
import { BuscarNotasInternas } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarNotasInternas";
import { ServicioRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ServicioRepoMongo";

export class NotasInternasController{
    private static construirRepos() {
            const servicio = new ServicioRepoMongo();
            const empleado = new EmpleadoRepoMongo()
            const habitacion = new HabitacionRepoMongo(servicio)
            const cliente = new ClienteRepoMongo()
            const reserva = new ReservaRepoMongo(servicio, cliente, habitacion, empleado)
            const notas = new NotasInternasRepoMongo(empleado, reserva, habitacion, cliente)
            reserva.setNotasInternasRepo(notas)
            return { empleado, habitacion, cliente, reserva, notas }
    }

    static async crearNotaInterna(req: Request, res: Response): Promise<void> {
        const { nuevaNotaInterna } = req.body;
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new CrearNotasInternas(repos.notas);
            const nuevaNotaInternaDomain = await NotasInternasMapper.desdeDocumento(nuevaNotaInterna, {
                empleadoRepo: repos.empleado,
                clienteRepo: repos.cliente,
                reservaRepo: repos.reserva,
                habitacionRepo: repos.habitacion
            });
            await casoDeUso.ejecutar(nuevaNotaInternaDomain);
            res.status(201).json({ mensaje: 'Nota Interna creada correctamente' });
        } catch (err) {
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
            const repos = NotasInternasController.construirRepos();
            const notasInternasModObj =  await NotasInternasMapper.desdeDocumento(notasInternasMod,{
                empleadoRepo:repos.empleado,
                clienteRepo:repos.cliente,
                reservaRepo:repos.reserva,
                habitacionRepo:repos.habitacion
            })
            const casoDeUso = new ModificarNotasInternas(repos.notas)
            await casoDeUso.ejecutar(notasInternasModObj,true)
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
            const repos = NotasInternasController.construirRepos();
            const notasInternasObj =  await NotasInternasMapper.desdeDocumento(notaInterna,{
                empleadoRepo:repos.empleado,
                clienteRepo:repos.cliente,
                reservaRepo:repos.reserva,
                habitacionRepo:repos.habitacion
            })
            const casoDeUso = new EliminarNotasInternas(repos.notas)
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
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas(repos.notas)
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
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas(repos.notas)
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
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas(repos.notas)
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
             const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas(repos.notas)
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
    static async buscarTodasLasNotas(req:Request,res:Response):Promise<void>{
        try {
            const repos = NotasInternasController.construirRepos();
            const casoDeUso = new BuscarNotasInternas(repos.notas)
            const NotasEncontradas = await casoDeUso.buscarTodasLasNotas()
            res.status(201).json(NotasEncontradas)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
}