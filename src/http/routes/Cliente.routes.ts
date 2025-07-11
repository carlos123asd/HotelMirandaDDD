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
 * /cliente/crear:
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
 *               nuevoCliente:
 *                 type: object
 *                 properties:
 *                      nombre:
 *                          type: string
 *                      email:
 *                          type: string
 *                      direccion:
 *                          type: string
 *                      password:
 *                          type: string
 *                      metodoPago:
 *                          type: string
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       404:
 *         description: Error al crear Cliente
 */
routerCliente.post('/crear',ClienteController.crearCliente)
/**
 * @swagger
 * /cliente/modificar:
 *   put:
 *     summary: Modificar un cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteMod:
 *                 type: object
 *                 properties:
*                      _id:
*                          type: string
*                      nombre:
*                          type: string
*                      email:
*                          type: string
*                      direccion:
*                          type: string
*                      password:
*                          type: string
*                      metodoPago:
*                          type: string
 *     responses:
 *       200:
 *         description: Cliente modificado correctamente
 *       404:
 *         description: Error al modificar un cliente
 */
routerCliente.put('/modificar',ClienteController.modificarCliente)
/**
 * @swagger
 * /cliente/eliminar:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: object
 *                 properties:
 *                      _id:
 *                          type: string
 *                      nombre:
 *                          type: string
 *                      email:
 *                          type: string
 *                      direccion:
 *                          type: string
 *                      password:
 *                          type: string
 *                      metodoPago:
 *                          type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Error al eliminar un cliente
 */
routerCliente.delete('/eliminar',ClienteController.eliminarCliente)
/**
 * @swagger
 * /cliente/buscar/id/{id}:
 *   get:
 *     summary: Buscar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado correctamente por ID
 *       404:
 *         description: Error al buscar un cliente por ID
 */
routerCliente.get('/buscar/id/:id',ClienteController.buscarPorId)
/**
 * @swagger
 * /cliente/buscar/email/{email}:
 *   get:
 *     summary: Buscar un cliente por email
 *     tags: [Clientes]
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: email unico del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado correctamente por email
 *       404:
 *         description: Error al buscar un cliente por email
 */
routerCliente.get('/buscar/email/:email',ClienteController.buscarPorEmail)
/**
 * @swagger
 * /cliente/:
 *  get:
 *      summary: Buscar todos los Clientes
 *      tags: [Clientes]
 *      response:
 *          200:
 *              description: Clientes encontrados correctamente
 *          404:
 *              description: Error al encontrar los Clientes
 */
routerCliente.get('/',ClienteController.buscarTodosClientes)
export default routerCliente