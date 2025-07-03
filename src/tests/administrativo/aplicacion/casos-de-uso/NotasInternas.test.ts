import { Empleado, StatusType } from "../../../../contexts/administrativo/dominio/agregados/Empleado"
import { categoriaHabitacion, Habitacion } from "../../../../contexts/administrativo/dominio/agregados/Habitacion"
import { NotasInternas, tiposNotasInternas } from "../../../../contexts/administrativo/dominio/agregados/NotasInternas"
import { INotasInternasRepo } from "../../../../contexts/administrativo/dominio/repositorios/INotasInternasRepo"
import { Permiso } from "../../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../../contexts/administrativo/dominio/value-objects/Rol"
import { Servicios } from "../../../../contexts/administrativo/dominio/value-objects/Servicios"

describe("casos de uso - Notas Internas", () => {
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
    const notasInternasRepo:INotasInternasRepo = {
        guardar: jest.fn(),
        eliminar: jest.fn(),
        buscarId: jest.fn().mockReturnValue(
            notaInterna
        ),
        buscarPorHabitacion: jest.fn().mockReturnValue(
            [notaInterna]
        ),
        buscarPorCliente: jest.fn().mockReturnValue(
            [notaInterna]
        ),
        buscarPorReserva: jest.fn().mockReturnValue(
            [notaInterna]
        ),
        buscarTodasLasNotas: jest.fn().mockReturnValue(
            [notaInterna]
        )
    }

    it("crear nota interna", async () => {
        await notasInternasRepo.guardar(notaInterna,false)
        expect(notasInternasRepo.guardar).toHaveBeenCalledWith(notaInterna,false)
    })

    it("eliminar nota interna", async () => {
        const id = "1"
        await notasInternasRepo.eliminar(id)

        expect(notasInternasRepo.eliminar).toHaveBeenCalledWith(id)
    })

    it("buscar habitacion por id", async () => {
        const habitacion = await notasInternasRepo.buscarId("1")
        expect(habitacion).not.toBeNull()
        expect(habitacion).toBeInstanceOf(NotasInternas)
        expect(habitacion?.id).toBe("1")
    })

    it("buscar notas internas por habitacion", async () => {
        const notas = await notasInternasRepo.buscarPorHabitacion("1")
        expect(notas).not.toBeNull()
        expect(notas).toBeInstanceOf(Array)
        expect(notas?.length).toBeGreaterThan(0)
        expect(notas?.[0]).toBeInstanceOf(NotasInternas)
        expect(notas?.[0].habitacion?.id).toBe("1")
    })
})