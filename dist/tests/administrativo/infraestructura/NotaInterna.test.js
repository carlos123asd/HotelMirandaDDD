"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const NotasInternas_1 = require("../../../contexts/administrativo/infraestructura/models/NotasInternas");
const mongoose_1 = __importDefault(require("mongoose"));
describe("Infraestructura - Test de Integracion Notas Internas", () => {
    it("Debe crear una nota interna y recuperarla", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            idResponsable: faker_1.faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker_1.faker.date.recent(),
            titulo: faker_1.faker.lorem.sentence(),
            descripcion: faker_1.faker.lorem.paragraph(),
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        };
        const notaInterna = new NotasInternas_1.MNotasInternas(fakeNotaInterna);
        await notaInterna.save();
        const found = await NotasInternas_1.MNotasInternas.findById(notaInterna._id);
        expect(found).not.toBeNull();
        expect(found?.titulo).toBe(fakeNotaInterna.titulo);
    });
    it("Debe actualizar una nota interna", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            idResponsable: faker_1.faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker_1.faker.date.recent(),
            titulo: faker_1.faker.lorem.sentence(),
            descripcion: faker_1.faker.lorem.paragraph(),
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        };
        const notaInterna = new NotasInternas_1.MNotasInternas(fakeNotaInterna);
        await notaInterna.save();
        notaInterna.titulo = "Titulo Actualizado";
        await notaInterna.save();
        const found = await NotasInternas_1.MNotasInternas.findById(notaInterna._id);
        expect(found).not.toBeNull();
        expect(found?.titulo).toBe("Titulo Actualizado");
    });
    it("Debe eliminar una nota interna", async () => {
        const fakeNotaInterna = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            idResponsable: faker_1.faker.string.uuid(),
            tipo: "Habitacion",
            fecha: faker_1.faker.date.recent(),
            titulo: faker_1.faker.lorem.sentence(),
            descripcion: faker_1.faker.lorem.paragraph(),
            datosAgregados: null,
            idCliente: null,
            idReserva: null,
            idHabitacion: null
        };
        const notaInterna = new NotasInternas_1.MNotasInternas(fakeNotaInterna);
        await notaInterna.save();
        await NotasInternas_1.MNotasInternas.deleteOne({ _id: notaInterna._id });
        const found = await NotasInternas_1.MNotasInternas.findById(notaInterna._id);
        expect(found).toBeNull();
    });
});
