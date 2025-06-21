import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const routerCliente = Router()
routerCliente.post('/crear',ClienteController.crearCliente)
routerCliente.put('/modificar',ClienteController.modificarCliente)
routerCliente.delete('/eliminar',ClienteController.eliminarCliente)
routerCliente.get('/buscar/id/:id',ClienteController.buscarPorId)
routerCliente.get('/buscar/email/:email',ClienteController.buscarPorEmail)
export default routerCliente