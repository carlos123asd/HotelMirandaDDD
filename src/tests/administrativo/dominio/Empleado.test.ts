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
})