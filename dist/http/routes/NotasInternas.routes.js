"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotasInternasController_1 = require("../controllers/NotasInternasController");
const routerNotasInternas = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *  name: Notas Internas
 *  description: Operaciones relacionadas con Notas Internas
 */
/**
 * @swagger
 * /notasInternas/crear:
 *   post:
 *     summary: Crear una nueva Nota Interna
 *     tags: [Notas Internas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevaNotaInterna:
 *                 type: object
 *                 properties:
 *                   idResponsable:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   tipoReserva:
 *                      type: string
 *                   datosAgregados:
 *                     type: array
 *                     items:
 *                          type: string
 *                   idCliente:
 *                       type: string
 *                   idReserva:
 *                       type: string
 *                   idHabitacion:
 *                       type: string
 *     responses:
 *       201:
 *         description: Nota Interna creada correctamente
 *       404:
 *         description: Error al crear una Nota Interna
 */
routerNotasInternas.post('/crear', NotasInternasController_1.NotasInternasController.crearNotaInterna);
/**
 * @swagger
 * /notasInternas/modificar:
 *   put:
 *     summary: Modificar una Nota Interna
 *     tags: [Notas Internas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notasInternasMod:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   idResponsable:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   tipoReserva:
 *                      type: string
 *                   datosAgregados:
 *                     type: array
 *                     items:
 *                          type: string
 *                   idCliente:
 *                       type: string
 *                   idReserva:
 *                       type: string
 *                   idHabitacion:
 *                       type: string
 *     responses:
 *       201:
 *         description: Nota Interna creada correctamente
 *       404:
 *         description: Error al crear una Nota Interna
 */
routerNotasInternas.put('/modificar', NotasInternasController_1.NotasInternasController.modificarNotaInterna);
/**
 * @swagger
 * /notasInternas/eliminar:
 *   delete:
 *     summary: Eliminar una Nota Interna
 *     tags: [Notas Internas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notaInterna:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   idResponsable:
 *                     type: string
 *                   tipo:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   tipoReserva:
 *                      type: string
 *                   datosAgregados:
 *                     type: array
 *                     items:
 *                          type: string
 *                   idCliente:
 *                       type: string
 *                   idReserva:
 *                       type: string
 *                   idHabitacion:
 *                       type: string
 *     responses:
 *       201:
 *         description: Nota Interna eliminada correctamente
 *       404:
 *         description: Error al eliminar una Nota Interna
 */
routerNotasInternas.delete('/eliminar', NotasInternasController_1.NotasInternasController.eliminarNotaInterna);
/**
 * @swagger
 * /notasInternas/buscar/id/{id}:
 *  get:
 *      summary: Buscar una Nota Interna por ID
 *      tags: [Notas Internas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico de una Nota Interna
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Nota Interna encontrada correctamente por ID
 *          404:
 *              description: Error al encontrar una Nota Interna por ID
 */
routerNotasInternas.get('/buscar/id/:id', NotasInternasController_1.NotasInternasController.buscarPorID);
/**
 * @swagger
 * /notasInternas/buscar/habitacion/{id}:
 *  get:
 *      summary: Buscar una Nota Interna por IDHabitacion
 *      tags: [Notas Internas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: IDHabitacion relacionada a una Nota Interna
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Nota Interna encontrada correctamente por IDHabitacion
 *          404:
 *              description: Error al encontrar una Nota Interna por IDHabitacion
 */
routerNotasInternas.get('/buscar/habitacion/:id', NotasInternasController_1.NotasInternasController.buscarPorHabitacion);
/**
 * @swagger
 * /notasInternas/buscar/cliente/{id}:
 *  get:
 *      summary: Buscar una Nota Interna por IDCliente
 *      tags: [Notas Internas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: IDCliente relacionada a una Nota Interna
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Nota Interna encontrada correctamente por IDCliente
 *          404:
 *              description: Error al encontrar una Nota Interna por IDCliente
 */
routerNotasInternas.get('/buscar/cliente/:id', NotasInternasController_1.NotasInternasController.buscarPorCliente);
/**
 * @swagger
 * /notasInternas/buscar/reserva/{id}:
 *  get:
 *      summary: Buscar una Nota Interna por IDReserva
 *      tags: [Notas Internas]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: IDReserva relacionada a una Nota Interna
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Nota Interna encontrada correctamente por IDReserva
 *          404:
 *              description: Error al encontrar una Nota Interna por IDReserva
 */
routerNotasInternas.get('/buscar/reserva/:id', NotasInternasController_1.NotasInternasController.buscarPorReserva);
/**
 * @swagger
 * /notasInternas/:
 *  get:
 *      summary: Buscar Todas las Notas
 *      tags: [Notas Internas]
 *      response:
 *          200:
 *              description: Notas encontradas correctamente
 *          404:
 *              description: Error al buscar Notas
 */
routerNotasInternas.get('/', NotasInternasController_1.NotasInternasController.buscarTodasLasNotas);
exports.default = routerNotasInternas;
