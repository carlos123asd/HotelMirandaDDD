import { DTOCliente } from "../../../contexts/cliente/aplicacion/dtos/DTOCliente"
import { Cliente, metodoPago } from "../../../contexts/cliente/dominio/agregados/Cliente"

describe("Cliente",() => {
    it("crear desde Persistencia", () => {
        const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const clienteDesdePersistencia = Cliente.crearDesdePersistencia({
            id: cliente.id,
            nombre: cliente.nombre,
            email: cliente.email,
            direccion: cliente.direccion,
            password: cliente.password,
            metodoPago: cliente.metodoPago
        })
        expect(clienteDesdePersistencia).toEqual(cliente)
    })

    it("crear desde DTO", () => {
         const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const clienteDTO:DTOCliente = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            password: "password123",
            metodoPago: metodoPago.Tarjeta
        }
        const clienteDesdeDTO = Cliente.crearDesdeDTO(clienteDTO);
        expect(clienteDesdeDTO).toEqual(cliente);
    })

    it("modificar desde DTO (DIRECCION Y PASSWORD)", () => {
        const clienteDTO:DTOCliente = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle Falsa 123",
            password: "password123",
            metodoPago: metodoPago.Tarjeta
        }
        const cliente = Cliente.crearDesdeDTO(clienteDTO);
        const nuevoDTO:DTOCliente = {
            id: "1",
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            direccion: "Calle RERAL 123",
            password: "nuevaPassword123",
            metodoPago: metodoPago.Tarjeta
        }
        cliente.modificarDesdeDTO(nuevoDTO);
        expect(cliente.direccion).toBe(nuevoDTO.direccion);
        expect(cliente.password).toBe(nuevoDTO.password);
    })
})