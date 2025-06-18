import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";

const routerEmpleado = Router()

routerEmpleado.post('/crear',EmpleadoController.crearEmpleado)
routerEmpleado.post('/modificar',EmpleadoController.modificarEmpleado)

export default routerEmpleado