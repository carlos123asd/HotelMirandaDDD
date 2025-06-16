import { DTOEmpleado } from "../../../contexts/administrativo/aplicacion/dtos/DTOEmpleado"
import { Empleado, StatusType } from "../../../contexts/administrativo/dominio/agregados/Empleado"
import { NivelPermisos, Permiso } from "../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../contexts/administrativo/dominio/value-objects/Rol"

describe("Empleado", () => {
    it("es Rol admin", () => {
        const admin = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.ADMIN,
            StatusType.ACTIVO,
            [new Permiso('ADM',3,"admin")]
        )
        expect(admin.esAdmin()).toBe(true)
    })
    it("no es Rol Admin ", () => {
        const admin = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GR',3,"staff")]
        )
        expect(admin.esAdmin()).toBe(false)
    })
    it("no tiene permiso GESTION EMPLEADO(GE)", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GR',3,"staff")]
        )
        expect(staff.tienePermisoGE()).toBe(false)
    })
    it("tiene permiso GE, GR y GH",() => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',3,"staff"),
            new Permiso('GH',3,"staff"),
            new Permiso('GR',3,"staff")]
        )
        expect(staff.tienePermisoGE()).toBe(true)
        expect(staff.tienePermisoGH()).toBe(true)
        expect(staff.tienePermisoGR()).toBe(true)
    })
    it("consultar nivel de permiso Crear,Modificar,Eliminar", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',3,"staff"),
            new Permiso('GH',3,"staff"),
            new Permiso('GR',3,"staff")]
        )
        expect(staff.consultarNivelPermiso(1 as NivelPermisos)).toBe(true)
        expect(staff.consultarNivelPermiso(2 as NivelPermisos)).toBe(true)
        expect(staff.consultarNivelPermiso(3 as NivelPermisos)).toBe(true)
    })
    it("puede dar alta empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',3,"staff"),
            new Permiso('GH',3,"staff"),
            new Permiso('GR',3,"staff")]
        )
        expect(staff.puedeDarAltaEmpleado()).toBe(true)
    })
    it("no puede dar alta empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GH',3,"staff"),
            new Permiso('GR',3,"staff")]
        )
        expect(staff.puedeDarAltaEmpleado()).toBe(false)
    })
    it("puede modificar empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.ADMIN,
            StatusType.ACTIVO,
            []
        )
        expect(staff.puedeModificarEmpleado()).toBe(true)
    })
    it("no puede modificar empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',1,"staff")]
        )
        expect(staff.puedeModificarEmpleado()).toBe(false)
    })
    it("puede eliminar empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',3,"staff")]
        )
        expect(staff.puedeEliminarEmpleado()).toBe(true)
    })
    it("no puede eliminar empleado", () => {
        const staff = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE',2,"staff")]
        )
        expect(staff.puedeEliminarEmpleado()).toBe(false)
    })

    it("crear desde DTO", () => {
        const dto:DTOEmpleado = {
            id: "1",
            email: "carlos-medin@hotmail.com",
            photo: "photo.com",
            startDate: new Date(),
            telefono: "12345",
            codigo: "1998CM",
            nombre: "Carlos Medina",
            password: "@123",
            rol: Rol.STAFF,
            permisosExtra: [
                new Permiso('GE', 2, "staff")
            ],
            status: StatusType.ACTIVO,
        }
        const staff = Empleado.crearDesdeDTO(dto);
        expect(staff.id).toBe(dto.id);
        expect(staff.email).toBe(dto.email);
        expect(staff.photo).toBe(dto.photo);
        expect(staff.startDate).toBe(dto.startDate);
        expect(staff.telefono).toBe(dto.telefono);
        expect(staff.codigo).toBe(dto.codigo);
        expect(staff.nombre).toBe(dto.nombre);
        expect(staff.password).toBe(dto.password);
        expect(staff.rol).toBe(dto.rol);
        expect(staff.status).toBe(dto.status);
        expect(staff.permisosExtra).toEqual(dto.permisosExtra);
    })

    it("modificar desde DTO (password,status)", () => {
        const empleado = new Empleado(
            "1",
            "carlos-medin@hotmail.com",
            "photo.com",
            new Date(),
            "12345",
            "1998CM",
            "Carlos Medina",
            "@123",
            Rol.STAFF,
            StatusType.ACTIVO,
            [new Permiso('GE', 2, "staff")]
        )
        const dto: DTOEmpleado = {
            id: "1",
            email: "carlos-medin@hotmail.com",
            photo: "photo.com",
            startDate: new Date(),
            telefono: "12345asd",
            codigo: "1998CM",
            nombre: "Carlos Medina",
            password: "@123",
            rol: Rol.STAFF,
            permisosExtra: [
                new Permiso('GE', 2, "staff")
            ],
            status: StatusType.INACTIVO,
        }
        empleado.modificarDesdeDTO(dto);
        expect(empleado.password).toBe(dto.password);
        expect(empleado.status).toBe(dto.status);
    })
})