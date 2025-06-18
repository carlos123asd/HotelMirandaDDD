import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";

const routerEmpleado = Router()

routerEmpleado.post('/crear',EmpleadoController.crearEmpleado)
routerEmpleado.post('/modificar',EmpleadoController.modificarEmpleado)
routerEmpleado.post('/eliminar',EmpleadoController.eliminarEmpleado)
routerEmpleado.get('/buscarPorId:id',EmpleadoController.buscarPorID)
routerEmpleado.get('/buscarPorEmail:email',EmpleadoController.buscarPorEmail)
routerEmpleado.get('/buscarPorCodigo:codigo',EmpleadoController.buscarPorCodigo)

export default routerEmpleado