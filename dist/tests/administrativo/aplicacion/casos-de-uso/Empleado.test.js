"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Empleado_1 = require("../../../../contexts/administrativo/dominio/agregados/Empleado");
const Permiso_1 = require("../../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../../contexts/administrativo/dominio/value-objects/Rol");
describe("Casos de uso Empleado", () => {
    const empleadoRepo = {
        buscarPorId: jest.fn().mockResolvedValue(Promise.resolve(new Empleado_1.Empleado("1", "juan.perez@example.com", "photo.com", new Date(), "12345", "1998CM", "Juan Perez", "password123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]))),
        guardar: jest.fn(),
        buscarPorEmail: jest.fn().mockResolvedValue(Promise.resolve(new Empleado_1.Empleado("1", "juan.perez@example.com", "photo.com", new Date(), "12345", "1998CM", "Juan Perez", "password123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]))),
        buscarPorCodigo: jest.fn().mockResolvedValue(Promise.resolve(new Empleado_1.Empleado("1", "juan.perez@example.com", "photo.com", new Date(), "12345", "1998CM", "Juan Perez", "password123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]))),
        eliminar: jest.fn(),
        buscarTodosEmpleado: jest.fn().mockResolvedValue([
            new Empleado_1.Empleado("1", "juan.perez@example.com", "photo.com", new Date(), "12345", "1998CM", "Juan Perez", "password123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")])
        ])
    };
    it("crear empleado con el tipo Correcto", async () => {
        const empleado = new Empleado_1.Empleado("1", "juan.perez@example.com", "photo.com", new Date(), "12345", "1998CM", "Juan Perez", "password123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]);
        await empleadoRepo.guardar(empleado, false);
        expect(empleadoRepo.guardar).toHaveBeenCalledWith(empleado, false);
    });
    it("eliminar con parametro correcto", async () => {
        await empleadoRepo.eliminar("1");
        expect(empleadoRepo.eliminar).toHaveBeenCalledWith("1");
    });
    it("buscar por ID", async () => {
        const empleado = await empleadoRepo.buscarPorId("1");
        expect(empleado).not.toBeNull();
        expect(empleado).toBeInstanceOf(Empleado_1.Empleado);
        expect(empleado && empleado.id).toBe("1");
    });
    it("buscar por email", async () => {
        const empleado = await empleadoRepo.buscarPorEmail("juan.perez@example.com");
        expect(empleado).not.toBeNull();
        expect(empleado).toBeInstanceOf(Empleado_1.Empleado);
        expect(empleado && empleado.email).toBe("juan.perez@example.com");
    });
    it("buscar por codigo", async () => {
        const empleado = await empleadoRepo.buscarPorCodigo("1998CM");
        expect(empleado).not.toBeNull();
        expect(empleado).toBeInstanceOf(Empleado_1.Empleado);
        expect(empleado && empleado.codigo).toBe("1998CM");
    });
});
