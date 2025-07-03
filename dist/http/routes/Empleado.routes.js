"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmpleadoController_1 = require("../controllers/EmpleadoController");
const routerEmpleado = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *  name: Empleados
 *  description: Operaciones relacionadas con Empleados
 */
/**
 * @swagger
 * /empleado/crear:
 *   post:
 *     summary: Crear un nuevo Empleado (permisoExtra ?, codigo para nuevo empleado ?)
 *     tags: [Empleados]
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
 *               nuevoEmpleado:
 *                 type: object
 *                 properties:
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
 *                     nullable: true
 *                   nombre:
 *                     type: string
 *                   password:
 *                     type: string
 *                   rol:
 *                     type: string
 *                   permisosExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   status:
 *                     type: string
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
 *       404:
 *         description: Error al crear empleado
 */
routerEmpleado.post('/crear', EmpleadoController_1.EmpleadoController.crearEmpleado);
/**
 * @swagger
 * /empleado/modificar:
 *   put:
 *     summary: Modificar un Empleado (Codigo y _ID no modificable)
 *     tags: [Empleados]
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
 *               empleadoMod:
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
 *                     nullable: true
 *                   nombre:
 *                     type: string
 *                   password:
 *                     type: string
 *                   rol:
 *                     type: string
 *                   permisosExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   status:
 *                     type: string
 *     responses:
 *       201:
 *         description: Empleado modificado correctamente
 *       404:
 *         description: Error al modificar empleado
 */
routerEmpleado.put('/modificar', EmpleadoController_1.EmpleadoController.modificarEmpleado);
/**
 * @swagger
 * /empleado/eliminar:
 *   delete:
 *     summary: Eliminar un Empleado
 *     tags: [Empleados]
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
 *               empleado:
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
 *                     nullable: true
 *                   nombre:
 *                     type: string
 *                   password:
 *                     type: string
 *                   rol:
 *                     type: string
 *                   permisosExtra:
 *                     type: array
 *                     nullable: true
 *                     items:
 *                       type: string
 *                   status:
 *                     type: string
 *     responses:
 *       201:
 *         description: Empleado eliminado correctamente
 *       404:
 *         description: Error al eliminar empleado
 */
routerEmpleado.delete('/eliminar', EmpleadoController_1.EmpleadoController.eliminarEmpleado);
/**
 * @swagger
 * /empleado/buscar/id/{id}:
 *  get:
 *      summary: Buscar un Empleado por ID
 *      tags: [Empleados]
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: id unico del empleado
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Empleado encontrado correctamente por ID
 *          404:
 *              description: Error al encontrar un empleado por ID
 */
routerEmpleado.get('/buscar/id/:id', EmpleadoController_1.EmpleadoController.buscarPorID);
/**
 * @swagger
 * /empleado/buscar/email/{email}:
 *  get:
 *      summary: Buscar un Empleado por email
 *      tags: [Empleados]
 *      parameters:
 *          - name: email
 *            in: path
 *            required: true
 *            description: email unico del empleado
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Empleado encontrado correctamente por email
 *          404:
 *              description: Error al encontrar un empleado por email
 */
routerEmpleado.get('/buscar/email/:email', EmpleadoController_1.EmpleadoController.buscarPorEmail);
/**
 * @swagger
 * /empleado/buscar/codigo/{codigo}:
 *  get:
 *      summary: Buscar un Empleado por codigo
 *      tags: [Empleados]
 *      parameters:
 *          - name: codigo
 *            in: path
 *            required: true
 *            description: codigo unico de empleado
 *            schema:
 *              type: string
 *      response:
 *          200:
 *              description: Empleado encontrado correctamente por codigo
 *          404:
 *              description: Error al encontrar un empleado por codigo
 */
routerEmpleado.get('/buscar/codigo/:codigo', EmpleadoController_1.EmpleadoController.buscarPorCodigo);
/**
 * @swagger
 * /empleado/:
 *  get:
 *      summary: Buscar todos los Empleados
 *      tags: [Empleados]
 *      response:
 *          200:
 *              description: Empleados encontrados correctamente
 *          404:
 *              description: Error al encontrar los empleados
 */
routerEmpleado.get('/', EmpleadoController_1.EmpleadoController.buscarTodosEmpleado);
exports.default = routerEmpleado;
