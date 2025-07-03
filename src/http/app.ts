import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routerEmpleado from './routes/Empleado.routes'
import routerHabitacion from './routes/Habitacion.router'
import routerCliente from './routes/Cliente.routes'
import routerNotasInternas from './routes/NotasInternas.routes'
import routerReserva from './routes/Reserva.routes'
import { MongooseConnection } from '../db/MongooseConnection'
import swaggerUI from 'swagger-ui-express'
import { swaggerObj } from './swagger/swaggerConfig'
import { seedEmpleados } from '../scripts/seed/empleado.seed'
import { seedReservas } from '../scripts/seed/reserva.seed'
import { seedCliente } from '../scripts/seed/cliente.seed'
import { seedHabitacion } from '../scripts/seed/habitacion.seed'
import { seedNotas } from '../scripts/seed/notas.seed'

dotenv.config()

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerObj))

const apiPaths = {
    empleado: '/empleado',
    habitacion: '/habitacion',
    notasInternas: '/notasInternas',
    reserva: '/reserva',
    cliente: '/cliente'
}

app.get('/',(req:Request,res:Response) => {
    res.status(200).json('Connected API')
})

app.use(apiPaths.empleado,routerEmpleado)
app.use(apiPaths.habitacion,routerHabitacion)
app.use(apiPaths.cliente,routerCliente)
app.use(apiPaths.notasInternas,routerNotasInternas)
app.use(apiPaths.reserva,routerReserva)

const startServer = async () => {
    try {
        await MongooseConnection.connect();
        //await seedEmpleados()
        //await seedReservas()
        //await seedCliente()
        //await seedHabitacion()
        //await seedNotas()
        const port = process.env?.PORT ? Number(process.env.PORT) : 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()

process.on('SIGINT', async () => {
    await MongooseConnection.disconnect()
    process.exit()
})