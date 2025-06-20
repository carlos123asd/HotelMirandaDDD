import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";

const routerReserva = Router()
routerReserva.post('/administracion/crear',ReservaController.crearReservaAdmin)
routerReserva.post('/administracion/modificar',ReservaController.modificarReservaAdmin)
routerReserva.post('/administracion/eliminar',ReservaController.eliminarReservaAdmin)
routerReserva.post('/administracion/buscar/id/:id',ReservaController.buscarPorId)
routerReserva.post('/administracion/buscar/cliente/:id',ReservaController.buscarPorCliente)
routerReserva.post('/administracion/buscar/habitacion/:id',ReservaController.buscarPorHabitacion)
export default routerReserva