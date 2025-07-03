"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const Reserva_1 = require("../../../contexts/administrativo/infraestructura/models/Reserva");
const Reserva_2 = require("../../../contexts/administrativo/dominio/agregados/Reserva");
describe("Infraestructura - Test de Integracion Reserva Cliente", () => {
    it("Debe crear una reserva", async () => {
        const fakeReserva = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: Reserva_2.estados.aceptada,
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            idEmpleado: null,
        };
        const reserva = new Reserva_1.MReserva(fakeReserva);
        await reserva.save();
        const found = await Reserva_1.MReserva.findById(reserva._id);
        expect(found).not.toBeNull();
        expect(found?._id?.toString()).toBe(fakeReserva._id);
    });
    it("Debe actualizar una reserva", async () => {
        const fakeReserva = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: Reserva_2.estados.aceptada,
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            idEmpleado: null,
        };
        const reserva = new Reserva_1.MReserva(fakeReserva);
        await reserva.save();
        reserva.estado = "aceptada";
        await reserva.save();
        const found = await Reserva_1.MReserva.findById(reserva._id);
        expect(found).not.toBeNull();
        expect(found?.estado).toBe("aceptada");
    });
    it("Debe eliminar una reserva", async () => {
        const fakeReserva = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: Reserva_2.estados.aceptada,
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            idEmpleado: null,
        };
        const reserva = new Reserva_1.MReserva(fakeReserva);
        await reserva.save();
        await Reserva_1.MReserva.deleteOne({ _id: reserva._id });
        const found = await Reserva_1.MReserva.findById(reserva._id);
        expect(found).toBeNull();
    });
});
