import { Router } from "express";
import { HabitacionControllers } from "../controllers/HabitacionController";

const routerHabitacion = Router()
routerHabitacion.post('/crear',HabitacionControllers.crearHabitacion)
routerHabitacion.put('/modificar',HabitacionControllers.modificarHabitacion)
routerHabitacion.delete('/eliminar',HabitacionControllers.eliminarHabitacion)
routerHabitacion.get('/buscar/id/:id',HabitacionControllers.buscarPorID)
routerHabitacion.get('/buscar/codigo/:codigo',HabitacionControllers.buscarPorCodigo)
routerHabitacion.get('/buscar/filtro/:filtro',HabitacionControllers.buscarPorFiltro)
routerHabitacion.get('/',HabitacionControllers.buscarTodasLasHabitaciones)
export default routerHabitacion
