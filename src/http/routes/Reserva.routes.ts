import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";

const routerReserva = Router()
routerReserva.post('/crear',ReservaController.crearReservaAdmin)
routerReserva.put('/modificar',ReservaController.modificarReservaAdmin)
routerReserva.delete('/eliminar',ReservaController.eliminarReservaAdmin)
routerReserva.get('/buscar/id/:id',ReservaController.buscarPorId)
routerReserva.get('/buscar/cliente/:id',ReservaController.buscarPorCliente)
routerReserva.get('/buscar/habitacion/:id',ReservaController.buscarPorHabitacion)
export default routerReserva