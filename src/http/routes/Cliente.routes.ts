import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const routerCliente = Router()
routerCliente.post('/crear',ClienteController.crearCliente)
routerCliente.post('/modificar',ClienteController.modificarCliente)
routerCliente.post('/eliminar',ClienteController.eliminarCliente)
routerCliente.post('/buscar/id/:id',ClienteController.buscarPorId)
routerCliente.post('/buscar/email/:email',ClienteController.buscarPorEmail)
export default routerCliente