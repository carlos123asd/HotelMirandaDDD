import { Router } from "express";
import { HabitacionControllers } from "../controllers/HabitacionController";

const routerHabitacion = Router()
/**
 * @swagger
 * tags:
 *  name: Habitaciones
 *  description: Operaciones relacionadas con Habitaciones
 */

/**
 * @swagger
 * /habitacion/crear:
 *   post:
 *     summary: Crear una nueva Habitacion
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responsable:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   codigo: 
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   password: 
 *                     type: string
 *                   rol:
 *                     type: string
 *                   status:
 *                     type: string
 *                   permisoExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *               nuevaHabitacion:
 *                 type: object
 *                 properties:
 *                   nombe:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: string
 *                   oferta:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                     nullable: true
 *                   servicios:
 *                     type: array
 *                     items:
 *                          type: string
 *                   imagenes:
 *                     type: array
 *                     items:
 *                          type: string
 *                   piso:
 *                     type: string
 *                   codigo:
 *                       type: string
 *     responses:
 *       201:
 *         description: Habitacion creada correctamente
 *       404:
 *         description: Error al crear Habitacion
 */
routerHabitacion.post('/crear',HabitacionControllers.crearHabitacion)
/**
 * @swagger
 * /habitacion/modificar:
 *   put:
 *     summary: Modifica una nueva Habitacion
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responsable:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   codigo: 
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   password: 
 *                     type: string
 *                   rol:
 *                     type: string
 *                   status:
 *                     type: string
 *                   permisoExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *               habitacionMod:
 *                 type: object
 *                 properties:
 *                   _id: 
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: string
 *                   oferta:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   servicios:
 *                     type: array
 *                     items:
 *                          type: string
 *                   imagenes:
 *                     type: array
 *                     items:
 *                          type: string
 *                   piso:
 *                     type: string
 *                   codigo:
 *                       type: string
 *     responses:
 *       201:
 *         description: Habitacion modificada correctamente
 *       404:
 *         description: Error al modificar Habitacion
 */
routerHabitacion.put('/modificar',HabitacionControllers.modificarHabitacion)
/**
 * @swagger
 * /habitacion/eliminar:
 *   delete:
 *     summary: Eliminar una Habitacion
 *     tags: [Habitaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               responsable:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   photo:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   codigo: 
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   password: 
 *                     type: string
 *                   rol:
 *                     type: string
 *                   status:
 *                     type: string
 *                   permisoExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *               habitacion:
 *                 type: object
 *                 properties:
 *                   _id: 
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   precio:
 *                     type: string
 *                   oferta:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   servicios:
 *                     type: array
 *                     items:
 *                          type: string
 *                   imagenes:
 *                     type: array
 *                     items:
 *                          type: string
 *                   piso:
 *                     type: string
 *                   codigo:
 *                       type: string
 *     responses:
 *       201:
 *         description: Habitacion eliminada correctamente
 *       404:
 *         description: Error al eliminar Habitacion
 */
routerHabitacion.delete('/eliminar',HabitacionControllers.eliminarHabitacion)
/**
 * @swagger
 * /habitacion/buscar/id/{id}:
 *  get:
 *      summary: Buscar una habitacion por ID
 *      tags: [Habitaciones]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico de Habitacion
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Habitacion encontrada correctamente por ID
 *          404:
 *              description: Error al encontrar una Habitacion por ID 
 */
routerHabitacion.get('/buscar/id/:id',HabitacionControllers.buscarPorID)
/**
 * @swagger
 * /habitacion/buscar/codigo/{codigo}:
 *  get:
 *      summary: Buscar una habitacion por codigo
 *      tags: [Habitaciones]
 *      parameters:
 *          - name: codigo
 *            in: path
 *            required: true
 *            description: codigo unico de Habitacion
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Habitacion encontrada correctamente por codigo
 *          404:
 *              description: Error al encontrar una Habitacion por codigo 
 */
routerHabitacion.get('/buscar/codigo/:codigo',HabitacionControllers.buscarPorCodigo)
/**
 * @swagger
 * /habitacion/buscar/filtro/{filtro}:
 *  get:
 *      summary: Buscar una habitacion por filtro
 *      tags: [Habitaciones]
 *      parameters:
 *          - name: filtro
 *            in: path
 *            required: true
 *            description: filtros para encontrar habitaciones, separadas por '-' y ','. Guiones para separar (categorias-precioMaximo-servicios)
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Habitaciones encontradas correctamente por filtros
 *          404:
 *              description: Error al encontrar Habitaciones por filtros
 */
routerHabitacion.get('/buscar/filtro/:filtro',HabitacionControllers.buscarPorFiltro)
/**
 * @swagger
 * /habitacion/:
 *  get:
 *      summary: Buscar Todas la habitaciones
 *      tags: [Habitaciones]
 *      response:
 *          200:
 *              description: Habitaciones encontradas correctamente
 *          404:
 *              description: Error al buscar Habitaciones
 */
routerHabitacion.get('/',HabitacionControllers.buscarTodasLasHabitaciones)
export default routerHabitacion
