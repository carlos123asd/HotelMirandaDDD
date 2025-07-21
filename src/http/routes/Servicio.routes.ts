import { Router } from "express";
import { ServicioController } from "../controllers/ServicioController";

const routerServicio = Router()
/**
 * @swagger
 * tags:
 *  name: Servicios
 *  description: Operaciones relacionadas con Servicios
 */

/**
 * @swagger
 * /servicio/crear:
 *   post:
 *     summary: Crear un nuevo Servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoServicio:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   imagen:
 *                     type: string
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 *       404:
 *         description: Error al crear servicio
 */
routerServicio.post('/crear',ServicioController.crearServicio)
/**
 * @swagger
 * /servicio/modificar:
 *   put:
 *     summary: Modificar un Servicio (_ID no modificable)
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               servicio:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   imagen:
 *                     type: string
 *     responses:
 *       201:
 *         description: Servicio modificado correctamente
 *       404:
 *         description: Error al modificar servicio
 */
routerServicio.put('/modificar',ServicioController.modificarServicio)
/**
 * @swagger
 * /servicio/eliminar:
 *   delete:
 *     summary: Eliminar un Servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               servicio:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   imagen:
 *                     type: string
 *     responses:
 *       201:
 *         description: Servicio eliminado correctamente
 *       404:
 *         description: Error al eliminar servicio
 */
routerServicio.delete('/eliminar',ServicioController.eliminarServicio)
/**
 * @swagger
 * /servicio/buscar/id/{id}:
 *  get:
 *      summary: Buscar un Servicio por ID
 *      tags: [Servicios]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico del servicio
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Servicio encontrado correctamente por ID
 *          404:
 *              description: Error al encontrar un servicio por ID
 */
routerServicio.get('/buscar/id/:id',ServicioController.buscarPorID)
/**
 * @swagger
 * /servicio/:
 *  get:
 *      summary: Buscar todos los Servicios
 *      tags: [Servicios]
 *      response:
 *          200:
 *              description: Servicios encontrados correctamente
 *          404:
 *              description: Error al encontrar Servicios
 */
routerServicio.get('/',ServicioController.buscarTodosServicios)
export default routerServicio