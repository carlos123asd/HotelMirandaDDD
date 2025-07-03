"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenerarCodigoEmpleado_1 = require("../../../contexts/administrativo/aplicacion/servicios-de-dominio/GenerarCodigoEmpleado");
const Empleado_1 = require("../../../contexts/administrativo/dominio/agregados/Empleado");
const Permiso_1 = require("../../../contexts/administrativo/dominio/value-objects/Permiso");
const Rol_1 = require("../../../contexts/administrativo/dominio/value-objects/Rol");
describe("Empleado", () => {
    it("es Rol admin", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('ADM', 3, "admin")]);
        expect(admin.esAdmin()).toBe(true);
    });
    it("no es Rol Admin ", () => {
        const admin = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(admin.esAdmin()).toBe(false);
    });
    it("no tiene permiso GESTION EMPLEADO(GE)", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(staff.tienePermisoGE()).toBe(false);
    });
    it("tiene permiso GE, GR y GH", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 3, "staff"),
            new Permiso_1.Permiso('GH', 3, "staff"),
            new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(staff.tienePermisoGE()).toBe(true);
        expect(staff.tienePermisoGH()).toBe(true);
        expect(staff.tienePermisoGR()).toBe(true);
    });
    it("consultar nivel de permiso Crear,Modificar,Eliminar", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 3, "staff"),
            new Permiso_1.Permiso('GH', 3, "staff"),
            new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(staff.consultarNivelPermiso(1)).toBe(true);
        expect(staff.consultarNivelPermiso(2)).toBe(true);
        expect(staff.consultarNivelPermiso(3)).toBe(true);
    });
    it("puede dar alta empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 3, "staff"),
            new Permiso_1.Permiso('GH', 3, "staff"),
            new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(staff.puedeDarAltaEmpleado()).toBe(true);
    });
    it("no puede dar alta empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GH', 3, "staff"),
            new Permiso_1.Permiso('GR', 3, "staff")]);
        expect(staff.puedeDarAltaEmpleado()).toBe(false);
    });
    it("puede modificar empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.ADMIN, Empleado_1.StatusType.ACTIVO, []);
        expect(staff.puedeModificarEmpleado()).toBe(true);
    });
    it("no puede modificar empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 1, "staff")]);
        expect(staff.puedeModificarEmpleado()).toBe(false);
    });
    it("puede eliminar empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 3, "staff")]);
        expect(staff.puedeEliminarEmpleado()).toBe(true);
    });
    it("no puede eliminar empleado", () => {
        const staff = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]);
        expect(staff.puedeEliminarEmpleado()).toBe(false);
    });
    it("crear desde DTO", () => {
        const dto = {
            id: "1",
            email: "carlos-medin@hotmail.com",
            photo: "photo.com",
            startDate: new Date(),
            telefono: "12345",
            codigo: "1998CM",
            nombre: "Carlos Medina",
            password: "@123",
            rol: Rol_1.Rol.STAFF,
            permisosExtra: [
                new Permiso_1.Permiso('GE', 2, "staff")
            ],
            status: Empleado_1.StatusType.ACTIVO,
        };
        const codigoEmppleado = (0, GenerarCodigoEmpleado_1.GenerarCodigoEmpleado)(dto.email, dto.telefono);
        const staff = Empleado_1.Empleado.crearDesdeDTO(dto, codigoEmppleado);
        expect(staff.id).toBe(dto.id);
        expect(staff.email).toBe(dto.email);
        expect(staff.photo).toBe(dto.photo);
        expect(staff.startDate).toBe(dto.startDate);
        expect(staff.telefono).toBe(dto.telefono);
        expect(staff.codigo).toBe(codigoEmppleado);
        expect(staff.nombre).toBe(dto.nombre);
        expect(staff.password).toBe(dto.password);
        expect(staff.rol).toBe(dto.rol);
        expect(staff.status).toBe(dto.status);
        expect(staff.permisosExtra).toEqual(dto.permisosExtra);
    });
    it("modificar desde DTO (password,status)", () => {
        const empleado = new Empleado_1.Empleado("1", "carlos-medin@hotmail.com", "photo.com", new Date(), "12345", "1998CM", "Carlos Medina", "@123", Rol_1.Rol.STAFF, Empleado_1.StatusType.ACTIVO, [new Permiso_1.Permiso('GE', 2, "staff")]);
        const dto = {
            id: "1",
            email: "carlos-medin@hotmail.com",
            photo: "photo.com",
            startDate: new Date(),
            telefono: "12345asd",
            codigo: "1998CM",
            nombre: "Carlos Medina",
            password: "@123",
            rol: Rol_1.Rol.STAFF,
            permisosExtra: [
                new Permiso_1.Permiso('GE', 2, "staff")
            ],
            status: Empleado_1.StatusType.INACTIVO,
        };
        empleado.modificarDesdeDTO(dto);
        expect(empleado.password).toBe(dto.password);
        expect(empleado.status).toBe(dto.status);
    });
});
