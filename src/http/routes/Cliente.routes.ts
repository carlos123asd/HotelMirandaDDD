import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const routerCliente = Router()
/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con clientes
 */

/**
 * @swagger
 * /clientes/crear:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 */
routerCliente.post('/crear',ClienteController.crearCliente)
/**
 * @swagger
 * /clientes/modificar:
 *   put:
 *     summary: Modificar un cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cliente modificado correctamente
 */
routerCliente.put('/modificar',ClienteController.modificarCliente)
routerCliente.delete('/eliminar',ClienteController.eliminarCliente)
routerCliente.get('/buscar/id/:id',ClienteController.buscarPorId)
routerCliente.get('/buscar/email/:email',ClienteController.buscarPorEmail)
export default routerCliente