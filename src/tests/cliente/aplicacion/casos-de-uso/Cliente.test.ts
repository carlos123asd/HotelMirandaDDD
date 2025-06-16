import { Cliente, metodoPago } from "../../../../contexts/cliente/dominio/agregados/Cliente"
import { IClienteRepo } from "../../../../contexts/cliente/dominio/repositorios/IClienteRepo"

describe("Casos de uso - Cliente", () => {
    const cliente = new Cliente(
        "1",
        "Juan Perez",
        "juan.perez@example.com",
        "Calle Falsa 123",
        "password123",
        metodoPago.Tarjeta
    )
    const ClienteRepo:IClienteRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarPorId: jest.fn().mockReturnValue(
            Promise.resolve(cliente)
        ),
        buscarPorEmail: jest.fn().mockReturnValue(
            Promise.resolve(cliente)
        )
    }
    it("crear un cliente", async () => {
        await ClienteRepo.guardar(cliente)
        expect(ClienteRepo.guardar).toHaveBeenCalledWith(cliente)
    })
    it("buscar un cliente por ID", async () => {
        const result = await ClienteRepo.buscarPorId("1")
        expect(result).not.toBeNull()
        expect(ClienteRepo.buscarPorId).toHaveBeenCalledWith("1")
        expect(result?.id).toBe("1")
        expect(result).toBeInstanceOf(Cliente)
    })
    it("buscar un cliente por email", async () => {
        const result = await ClienteRepo.buscarPorEmail("juan.perez@example.com")
        expect(result).not.toBeNull()
        expect(ClienteRepo.buscarPorEmail).toHaveBeenCalledWith("juan.perez@example.com")
        expect(result?.email).toBe("juan.perez@example.com")
        expect(result).toBeInstanceOf(Cliente)
    })
    it("eliminar un cliente", async () => {
        await ClienteRepo.eliminar("1")
        expect(ClienteRepo.eliminar).toHaveBeenCalledWith("1")
    })
})