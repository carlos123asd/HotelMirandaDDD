import { Router } from "express";
import { ReservaController } from "../controllers/ReservaController";

const routerReserva = Router()
/**
 * @swagger
 * tags:
 *  name: Reservas
 *  description: Operaciones relacionadas con Reservas
 */

/**
 * @swagger
 * /reserva/crear:
 *   post:
 *     summary: Crear una nueva Reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                reserva:
 *                 type: object
 *                 properties:
 *                   estado:
 *                     type: string
 *                   idCliente:
 *                     type: string
 *                   idHabitacion:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                   checkOut:
 *                     type: string
 *                   totalReserva:
 *                      type: string
 *                   idEmpleado:
 *                      type: string
 *                   extras:
 *                       type: array
 *                       items:
 *                          type: string
 *                   notasInternas:
 *                       type: array
 *                       items:
 *                          type: string
 *                recargo:
 *                     type: number
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       404:
 *         description: Error al crear una Reserva
 */
routerReserva.post('/crear',ReservaController.crearReserva)
/**
 * @swagger
 * /reserva/modificar:
 *   put:
 *     summary: Modificar una Reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                reserva:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   idCliente:
 *                     type: string
 *                   idHabitacion:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                   checkOut:
 *                     type: string
 *                   totalReserva:
 *                      type: string
 *                   idEmpleado:
 *                      type: string
 *                   extras:
 *                       type: array
 *                       items:
 *                          type: string
 *                   notasInternas:
 *                       type: array
 *                       items:
 *                          type: string
 *     responses:
 *       201:
 *         description: Reserva modificada correctamente
 *       404:
 *         description: Error al modificar una Reserva
 */
routerReserva.put('/modificar',ReservaController.modificarReserva)
/**
 * @swagger
 * /reserva/eliminar:
 *   delete:
 *     summary: Eliminar una Reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                reserva:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   idCliente:
 *                     type: string
 *                   idHabitacion:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                   checkOut:
 *                     type: string
 *                   totalReserva:
 *                      type: string
 *                   idEmpleado:
 *                      type: string
 *                   extras:
 *                       type: array
 *                       items:
 *                          type: string
 *                   notasInternas:
 *                       type: array
 *                       items:
 *                          type: string
 *     responses:
 *       201:
 *         description: Reserva modificada correctamente
 *       404:
 *         description: Error al modificar una Reserva
 */
routerReserva.delete('/eliminar',ReservaController.eliminarReserva)
/**
 * @swagger
 * /reserva/buscar/id/{id}:
 *  get:
 *      summary: Buscar una Reserva por ID
 *      tags: [Reservas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico de Reserva
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Reserva encontrada correctamente por ID
 *          404:
 *              description: Error al encontrar una Reserva por ID 
 */
routerReserva.get('/buscar/id/:id',ReservaController.buscarPorId)
/**
 * @swagger
 * /reserva/buscar/cliente/{id}:
 *  get:
 *      summary: Buscar una Reserva por IDCliente
 *      tags: [Reservas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico de IDCliente
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Reserva encontrada correctamente por IDCliente
 *          404:
 *              description: Error al encontrar una Reserva por IDCliente 
 */
routerReserva.get('/buscar/cliente/:id',ReservaController.buscarPorCliente)
/**
 * @swagger
 * /reserva/buscar/habitacion/{id}:
 *  get:
 *      summary: Buscar una Reserva por IDHabitacion
 *      tags: [Reservas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico de IDHabitacion
 *            schema: 
 *              type: string
 *      response:
 *          200:
 *              description: Reserva encontrada correctamente por IDHabitacion
 *          404:
 *              description: Error al encontrar una Reserva por IDHabitacion 
 */
routerReserva.get('/buscar/habitacion/:id',ReservaController.buscarPorHabitacion)
export default routerReserva