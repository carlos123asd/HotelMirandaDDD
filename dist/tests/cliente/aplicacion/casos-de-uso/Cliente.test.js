"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("../../../../contexts/cliente/dominio/agregados/Cliente");
describe("Casos de uso - Cliente", () => {
    const cliente = new Cliente_1.Cliente("1", "Juan Perez", "juan.perez@example.com", "Calle Falsa 123", "password123", Cliente_1.metodoPago.Tarjeta);
    const ClienteRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorId: jest.fn().mockReturnValue(Promise.resolve(cliente)),
        buscarPorEmail: jest.fn().mockReturnValue(Promise.resolve(cliente))
    };
    it("crear un cliente", async () => {
        await ClienteRepo.guardar(cliente, false);
        expect(ClienteRepo.guardar).toHaveBeenCalledWith(cliente, false);
    });
    it("buscar un cliente por ID", async () => {
        const result = await ClienteRepo.buscarPorId("1");
        expect(result).not.toBeNull();
        expect(ClienteRepo.buscarPorId).toHaveBeenCalledWith("1");
        expect(result?.id).toBe("1");
        expect(result).toBeInstanceOf(Cliente_1.Cliente);
    });
    it("buscar un cliente por email", async () => {
        const result = await ClienteRepo.buscarPorEmail("juan.perez@example.com");
        expect(result).not.toBeNull();
        expect(ClienteRepo.buscarPorEmail).toHaveBeenCalledWith("juan.perez@example.com");
        expect(result?.email).toBe("juan.perez@example.com");
        expect(result).toBeInstanceOf(Cliente_1.Cliente);
    });
    it("eliminar un cliente", async () => {
        await ClienteRepo.eliminar("1");
        expect(ClienteRepo.eliminar).toHaveBeenCalledWith("1");
    });
});
