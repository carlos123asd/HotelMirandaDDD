import { DTONotasInternas } from "../../../contexts/administrativo/aplicacion/dtos/DTONotasInternas"
import { Empleado, StatusType } from "../../../contexts/administrativo/dominio/agregados/Empleado"
import { categoriaHabitacion, Habitacion } from "../../../contexts/administrativo/dominio/agregados/Habitacion"
import { NotasInternas, tiposNotasInternas } from "../../../contexts/administrativo/dominio/agregados/NotasInternas"
import { Permiso } from "../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../contexts/administrativo/dominio/value-objects/Rol"
import { Servicios } from "../../../contexts/administrativo/dominio/value-objects/Servicios"

describe("Notas Internas", () => {
    it("crear desde Persistencia",() => {
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
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const notaInterna = NotasInternas.crearDesdePersistencia({
            id: "1",
            responsable: admin,
            tipo: tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente",
            datosAgregados: [],
            habitacion: habitacion
        })

        expect(notaInterna.id).toBe("1")
        expect(notaInterna.tipo).toBe(tiposNotasInternas.Habitacion)
        expect(notaInterna.fecha).toBeInstanceOf(Date)
        expect(notaInterna.titulo).toBe("Reparacion de aire acondicionado")
        expect(notaInterna.descripcion).toBe("El aire acondicionado de la habitacion 101 no funciona correctamente")
        expect(notaInterna.responsable).toBe(admin)
        expect(notaInterna.habitacion).toBe(habitacion)
})

    it("crear desde DTO", () => {
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
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const dto:DTONotasInternas = {
            id: "1",
            responsable: admin,
            tipo: tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente",
            datosAgregados: [],
            habitacion: habitacion,
        }
        const nota = NotasInternas.crearDesdeDTO(dto);
        expect(nota.id).toBe(dto.id);
        expect(nota.responsable).toBe(dto.responsable);
        expect(nota.tipo).toBe(dto.tipo);
        expect(nota.fecha).toBe(dto.fecha);
        expect(nota.titulo).toBe(dto.titulo);
        expect(nota.descripcion).toBe(dto.descripcion);
        expect(nota.datosAgregados).toEqual(dto.datosAgregados);
        expect(nota.habitacion).toBe(dto.habitacion);
    })
    
    it("modificar desde DTO (DESCRIPCION)", () => {
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
        const habitacion = new Habitacion(
            "1",
            "Habitacion Deluxe",
            "Habitacion con vista al mar",
            150,
            10,
            categoriaHabitacion.Suite,
            [Servicios.WIFI, Servicios.BUFFET],
            ["image1.jpg", "image2.jpg"],
            "2",
            "D123"
        )
        const notaInterna = new NotasInternas(
            "1",
            admin,
            tiposNotasInternas.Habitacion,
            new Date(),
            "Reparacion de aire acondicionado",
            "El aire acondicionado de la habitacion 101 no funciona correctamente",
            [],
            null,
            null,
            habitacion
        )
        const dto:DTONotasInternas = {
            id: "1",
            responsable: admin,
            tipo: tiposNotasInternas.Habitacion,
            fecha: new Date(),
            titulo: "Reparacion de aire acondicionado",
            descripcion: "El aire acondicionado de la habitacion 101 no funciona correctamente (MODFICADO)",
            datosAgregados: [],
            habitacion: habitacion,
        }
        notaInterna.modificarDesdeDTO(dto);
        expect(notaInterna.id).toBe(dto.id);
        expect(notaInterna.responsable).toBe(dto.responsable);
        expect(notaInterna.tipo).toBe(dto.tipo);
        expect(notaInterna.fecha).toBe(dto.fecha);
        expect(notaInterna.titulo).toBe(dto.titulo);
        expect(notaInterna.descripcion).toBe(dto.descripcion);
        expect(notaInterna.datosAgregados).toEqual(dto.datosAgregados);
        expect(notaInterna.habitacion).toBe(dto.habitacion);
    })
})