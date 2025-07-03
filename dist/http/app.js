"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Empleado_routes_1 = __importDefault(require("./routes/Empleado.routes"));
const Habitacion_router_1 = __importDefault(require("./routes/Habitacion.router"));
const Cliente_routes_1 = __importDefault(require("./routes/Cliente.routes"));
const NotasInternas_routes_1 = __importDefault(require("./routes/NotasInternas.routes"));
const Reserva_routes_1 = __importDefault(require("./routes/Reserva.routes"));
const MongooseConnection_1 = require("../db/MongooseConnection");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = require("./swagger/swaggerConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.swaggerObj));
const apiPaths = {
    empleado: '/empleado',
    habitacion: '/habitacion',
    notasInternas: '/notasInternas',
    reserva: '/reserva',
    cliente: '/cliente'
};
app.get('/', (req, res) => {
    res.status(200).json('Connected API');
});
app.use(apiPaths.empleado, Empleado_routes_1.default);
app.use(apiPaths.habitacion, Habitacion_router_1.default);
app.use(apiPaths.cliente, Cliente_routes_1.default);
app.use(apiPaths.notasInternas, NotasInternas_routes_1.default);
app.use(apiPaths.reserva, Reserva_routes_1.default);
const startServer = async () => {
    try {
        await MongooseConnection_1.MongooseConnection.connect();
        //await seedEmpleados()
        //await seedReservas()
        //await seedCliente()
        //await seedHabitacion()
        //await seedNotas()
        const port = process.env?.PORT ? Number(process.env.PORT) : 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
startServer();
process.on('SIGINT', async () => {
    await MongooseConnection_1.MongooseConnection.disconnect();
    process.exit();
});
