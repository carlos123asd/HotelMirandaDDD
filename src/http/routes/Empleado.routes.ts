import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";

const routerEmpleado = Router()

routerEmpleado.post('/crear',EmpleadoController.crearEmpleado)
routerEmpleado.put('/modificar',EmpleadoController.modificarEmpleado)
routerEmpleado.delete('/eliminar',EmpleadoController.eliminarEmpleado)
routerEmpleado.get('/buscar/id/:id',EmpleadoController.buscarPorID)
routerEmpleado.get('/buscar/email/:email',EmpleadoController.buscarPorEmail)
routerEmpleado.get('/buscar/codigo/:codigo',EmpleadoController.buscarPorCodigo)

export default routerEmpleado