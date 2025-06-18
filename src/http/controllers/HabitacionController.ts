import { Request, Response } from "express"
import { HabitacionRepoMongo } from "../../contexts/administrativo/infraestructura/repositorios/HabitacionRepoMongo";
import { CrearHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/CrearHabitacion";
import { EmpleadoMapper } from "../../contexts/administrativo/infraestructura/mappers/EmpleadoMapper";
import { HabitacionMapper } from "../../contexts/administrativo/infraestructura/mappers/HabitacionMapper";
import { ModificarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/ModificarHabitacion";
import { EliminarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/EliminarHabitacion";
import { BuscarHabitacion } from "../../contexts/administrativo/aplicacion/casos-de-uso/BuscarHabitacion";

export class HabitacionControllers{
    static async crearHabitacion(req:Request,res:Response):Promise<void>{
        const {responsable,nuevaHabitacion} = req.body
        try{
            const repoMongoHabitacion = new HabitacionRepoMongo()
            const casoDeUso = new CrearHabitacion(repoMongoHabitacion)
            const responsableDomain = EmpleadoMapper.desdeDocumento(responsable);
            const nuevaHabitacionDomain = HabitacionMapper.desdeDocumento(nuevaHabitacion);
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
            const repoMongoHabitacion = new HabitacionRepoMongo()
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const habitacionModObj = HabitacionMapper.desdeDocumento(habitacionMod)
            const casoDeUso = new ModificarHabitacion(repoMongoHabitacion)
            await casoDeUso.ejecutar(responsableObj,habitacionModObj,true)
            res.status(201).json({ mensaje: 'Empleado modificado correctamente' })
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
            const repoMongoHabitacion = new HabitacionRepoMongo()
            const responsableObj = EmpleadoMapper.desdeDocumento(responsable)
            const habitacionObj = HabitacionMapper.desdeDocumento(habitacion)
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
            const repoMongoHabitacion = new HabitacionRepoMongo()
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
            const repoMongoHabitacion = new HabitacionRepoMongo()
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
        const {categorias,precioMaximo,servicios,desde} = req.params
        const categoriasArray = categorias.split(",")
        const serviciosArray = servicios.split(",")
        try {
            const repoMongoHabitacion = new HabitacionRepoMongo()
            const casoDeUso = new BuscarHabitacion(repoMongoHabitacion)
            const habitacionEncontrada = await casoDeUso.buscarPorFiltro({
                categorias: categoriasArray ? categoriasArray : null,
                precioMaximo: precioMaximo ? Number(precioMaximo) : null,
                servicios: serviciosArray ? serviciosArray : null
            },Number(desde))
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
            const repoMongoHabitacion = new HabitacionRepoMongo()
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