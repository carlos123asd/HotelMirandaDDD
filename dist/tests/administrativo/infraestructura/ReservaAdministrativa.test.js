"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const Reserva_1 = require("../../../contexts/administrativo/infraestructura/models/Reserva");
const mongoose_1 = __importDefault(require("mongoose"));
describe("Infraestructura - Test de Integracion Notas Internas", () => {
    it("Debe crear una nota interna y recuperarla", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            idEmpleado: faker_1.faker.string.uuid(),
            extras: null,
            idNotasInternas: [faker_1.faker.string.uuid()]
        };
        const notaInterna = new Reserva_1.MReserva(fakeNotaInterna);
        await notaInterna.save();
        const found = await Reserva_1.MReserva.findById(notaInterna._id);
        expect(found).not.toBeNull();
        expect(found?._id.toString()).toBe(fakeNotaInterna._id);
    });
    it("Debe actualizar una nota interna", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            idEmpleado: faker_1.faker.string.uuid(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            extras: null,
            idNotasInternas: [faker_1.faker.string.uuid()]
        };
        const notaInterna = new Reserva_1.MReserva(fakeNotaInterna);
        await notaInterna.save();
        notaInterna.estado = "cancelada";
        await notaInterna.save();
        const found = await Reserva_1.MReserva.findById(notaInterna._id);
        expect(found).not.toBeNull();
        expect(found?.estado).toBe("cancelada");
    });
    it("Debe eliminar una nota interna", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            estado: "aceptada",
            idCliente: faker_1.faker.string.uuid(),
            idHabitacion: faker_1.faker.string.uuid(),
            checkIn: faker_1.faker.date.recent(),
            checkOut: faker_1.faker.date.future(),
            idEmpleado: faker_1.faker.string.uuid(),
            totalReserva: faker_1.faker.number.int({ min: 1000, max: 5000 }),
            extras: null,
            idNotasInternas: [faker_1.faker.string.uuid()]
        };
        const notaInterna = new Reserva_1.MReserva(fakeNotaInterna);
        await notaInterna.save();
        await Reserva_1.MReserva.deleteOne({ _id: notaInterna._id });
        const found = await Reserva_1.MReserva.findById(notaInterna._id);
        expect(found).toBeNull();
    });
});
