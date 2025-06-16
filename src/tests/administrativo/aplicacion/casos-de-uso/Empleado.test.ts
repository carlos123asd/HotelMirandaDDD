import { Empleado, StatusType } from "../../../../contexts/administrativo/dominio/agregados/Empleado"
import { IEmpleadoRepo } from "../../../../contexts/administrativo/dominio/repositorios/IEmpleadoRepo"
import { Permiso } from "../../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../../contexts/administrativo/dominio/value-objects/Rol"

describe("Casos de uso Empleado", () => {
    const empleadoRepo: IEmpleadoRepo = {
        buscarPorId: jest.fn().mockResolvedValue(
            Promise.resolve(
                new Empleado(
                    "1",
                    "juan.perez@example.com",
                    "photo.com",
                    new Date(),
                    "12345",
                    "1998CM",
                    "Juan Perez",
                    "password123",
                    Rol.STAFF,
                    StatusType.ACTIVO,
                    [new Permiso('GE', 2, "staff")]
                )
            )
        ),
        guardar: jest.fn(),
        buscarPorEmail: jest.fn().mockResolvedValue(
            Promise.resolve(
                new Empleado(
                    "1",
                    "juan.perez@example.com",
                    "photo.com",
                    new Date(),
                    "12345",
                    "1998CM",
                    "Juan Perez",
                    "password123",
                    Rol.STAFF,
                    StatusType.ACTIVO,
                    [new Permiso('GE', 2, "staff")]
                )
            )
        ),
        buscarPorCodigo: jest.fn().mockResolvedValue(
            Promise.resolve(
                new Empleado(
                    "1",
                    "juan.perez@example.com",
                    "photo.com",
                    new Date(),
                    "12345",
                    "1998CM",
                    "Juan Perez",
                    "password123",
                    Rol.STAFF,
                    StatusType.ACTIVO,
                    [new Permiso('GE', 2, "staff")]
                )
            )
        ),
        eliminar: jest.fn()
    }
    it("crear empleado con el tipo Correcto", async() => {
        const empleado =new Empleado(
            "1",
            "juan.perez@example.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Juan Perez",
            "password123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE', 2, "staff")]
        )
        await empleadoRepo.guardar(empleado)
        expect(empleadoRepo.guardar).toHaveBeenCalledWith(empleado)
    })
    it("eliminar con parametro correcto", async () => {
        await empleadoRepo.eliminar("1")
        expect(empleadoRepo.eliminar).toHaveBeenCalledWith("1")
    })
    it("buscar por ID", async () => {
        const empleado = await empleadoRepo.buscarPorId("1")
        expect(empleado).not.toBeNull()
        expect(empleado).toBeInstanceOf(Empleado)
        expect(empleado && empleado.id).toBe("1")
    })
    it("buscar por email", async () => {
        const empleado = await empleadoRepo.buscarPorEmail("juan.perez@example.com")
        expect(empleado).not.toBeNull()
        expect(empleado).toBeInstanceOf(Empleado)
        expect(empleado && empleado.email).toBe("juan.perez@example.com")
    })
    it("buscar por codigo", async () => {
        const empleado = await empleadoRepo.buscarPorCodigo("1998CM")
        expect(empleado).not.toBeNull()
        expect(empleado).toBeInstanceOf(Empleado)
        expect(empleado && empleado.codigo).toBe("1998CM")
    })
})