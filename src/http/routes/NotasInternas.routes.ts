import { Router } from "express";
import { NotasInternasController } from "../controllers/NotasInternasController";

const routerNotasInternas = Router()
routerNotasInternas.post('/crear',NotasInternasController.crearNotaInterna)
routerNotasInternas.put('/modificar',NotasInternasController.modificarNotaInterna)
routerNotasInternas.delete('/eliminar',NotasInternasController.eliminarNotaInterna)
routerNotasInternas.get('/buscar/id/:id',NotasInternasController.buscarPorID)
routerNotasInternas.get('/buscar/habitacion/:id',NotasInternasController.buscarPorHabitacion)
routerNotasInternas.get('/buscar/cliente/:id',NotasInternasController.buscarPorCliente)
routerNotasInternas.get('/buscar/reserva/:id',NotasInternasController.buscarPorReserva)
export default routerNotasInternas