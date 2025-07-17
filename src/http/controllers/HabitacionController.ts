import { Request, Response } from "express"
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { CrearHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearHabitacion";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";
import { HabitacionMapper } from "../../contexts/administrativo/infraestructura/mappers/HabitacionMapper";
import { ModificarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarHabitacion";
import { EliminarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarHabitacion";
import { BuscarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarHabitacion";
import { ServicioRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/ServicioRepoMongo";

export class HabitacionControllers{
    private static construirRepos() {
        const servicio = new ServicioRepoMongo();
        const habitacion = new HabitacionRepoMongo(servicio);
        return { habitacion, servicio };
    }
    static async crearHabitacion(req:Request,res:Response):Promise<void>{
        const {responsable,nuevaHabitacion} = req.body
        try{
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const casoDeUso = new CrearHabitacion(repoMongoHabitacion)
            const responsableDomain = EmpleadoMapper.desdeDocumento(responsable);
            const nuevaHabitacionDomain = await HabitacionMapper.desdeDocumento(
                { servicioRepo: this.construirRepos().servicio },
                nuevaHabitacion
            );
            await casoDeUso.ejecutar(responsableDomain,nuevaHabitacionDomain)
            res.status(201).json({ mensaje: 'Habitacion creada correctamente' })
        }catch(err){
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: String(err) });
            }
        }
    }
    static async modificarHabitacion(req:Request,res:Response):Promise<void>{
        const {responsable,habitacionMod} = req.body
        try {
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const habitacionModObj = await HabitacionMapper.desdeDocumento( { servicioRepo: new ServicioRepoMongo() },habitacionMod)
            const casoDeUso = new ModificarHabitacion(repoMongoHabitacion)
            await casoDeUso.ejecutar(responsableObj,habitacionModObj,true)
            res.status(201).json({ mensaje: 'Habitacion modificada correctamente' })
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ error: String(error) })
            }
        }
    }
    static async eliminarHabitacion(req:Request,res:Response):Promise<void>{
        const {responsable,habitacion} = req.body
        try {
            const { habitacion: repoMongoHabitacion, servicio: repoMongoServicio } = this.construirRepos();
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const habitacionObj = await HabitacionMapper.desdeDocumento({ servicioRepo: repoMongoServicio }, habitacion)
            const casoDeUso = new EliminarHabitacion(repoMongoHabitacion)
            await casoDeUso.ejecutar(responsableObj,habitacionObj)
            res.status(201).json({ mensaje: "Habitacion eliminada correctamente" })
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
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const casoDeUso = new BuscarHabitacion(repoMongoHabitacion)
            const habitacionEncontrada = await casoDeUso.buscarPorID(id)
            res.status(201).json(habitacionEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarPorCodigo(req:Request,res:Response):Promise<void>{
        const {codigo} = req.params
        try {
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const casoDeUso = new BuscarHabitacion(repoMongoHabitacion)
            const habitacionEncontrada = await casoDeUso.buscarPorCodigo(codigo)
            res.status(201).json(habitacionEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarPorFiltro(req:Request,res:Response):Promise<void>{
        const {filtro} = req.params
        const filtroArray = filtro.split("-")
        try {
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const casoDeUso = new BuscarHabitacion(repoMongoHabitacion)
            const habitacionEncontrada = await casoDeUso.buscarPorFiltro({
                categorias: filtroArray[0] ? filtroArray[0].split(",") : null,
                precioMaximo: filtroArray[1] ? Number(filtroArray[1]) : null,
                servicios: filtroArray[2] ? filtroArray[2].split(",") : null
            })
            res.status(201).json(habitacionEncontrada)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
    static async buscarTodasLasHabitaciones(req:Request,res:Response):Promise<void>{
        try {
            const { habitacion: repoMongoHabitacion } = this.construirRepos();
            const casoDeUso = new BuscarHabitacion(repoMongoHabitacion)
            const habitacionEncontradas = await casoDeUso.buscarTodasLasHabitaciones()
            res.status(201).json(habitacionEncontradas)
        }catch (error) {
            if(error instanceof Error){
                res.status(404).json({ error: error.message })
            }else{
                res.status(404).json({ mensaje: String(error) })
            }
        }
    }
}