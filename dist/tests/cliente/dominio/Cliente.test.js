"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("../../../contexts/cliente/dominio/agregados/Cliente");
describe("Cliente", () => {
    it("crear desde Persistencia", () => {
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const clienteDesdePersistencia = Cliente_1.Cliente.crearDesdePersistencia({
            id: cliente.id,
            nombre: cliente.nombre,
            email: cliente.email,
            direccion: cliente.direccion,
            password: cliente.password,
            metodoPago: cliente.metodoPago
        });
        expect(clienteDesdePersistencia).toEqual(cliente);
    });
    it("crear desde DTO", () => {
        const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
        const clienteDTO = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            password: "password123",
            metodoPago: Cliente_1.metodoPago.Tarjeta
        };
        const clienteDesdeDTO = Cliente_1.Cliente.crearDesdeDTO(clienteDTO);
        expect(clienteDesdeDTO).toEqual(cliente);
    });
    it("modificar desde DTO (DIRECCION Y PASSWORD)", () => {
        const clienteDTO = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            password: "password123",
            metodoPago: Cliente_1.metodoPago.Tarjeta
        };
        const cliente = Cliente_1.Cliente.crearDesdeDTO(clienteDTO);
        const nuevoDTO = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle RERAL 123",
            password: "nuevaPassword123",
            metodoPago: Cliente_1.metodoPago.Tarjeta
        };
        cliente.modificarDesdeDTO(nuevoDTO);
        expect(cliente.direccion).toBe(nuevoDTO.direccion);
        expect(cliente.password).toBe(nuevoDTO.password);
    });
});
