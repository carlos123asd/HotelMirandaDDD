import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";

const routerEmpleado = Router()

routerEmpleado.post('/crear',EmpleadoController.crearEmpleado)

export default routerEmpleado