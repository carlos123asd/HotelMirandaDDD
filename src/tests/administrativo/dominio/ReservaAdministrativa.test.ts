import { DTOReserva } from "../../../contexts/administrativo/aplicacion/dtos/DTOReserva"
import { Empleado, StatusType } from "../../../contexts/administrativo/dominio/agregados/Empleado"
import { categoriaHabitacion, Habitacion } from "../../../contexts/administrativo/dominio/agregados/Habitacion"
import { estados, ReservaAdministrativa, tipoReserva } from "../../../contexts/administrativo/dominio/agregados/ReservaAdministrativa"
import { Permiso } from "../../../contexts/administrativo/dominio/value-objects/Permiso"
import { Rol } from "../../../contexts/administrativo/dominio/value-objects/Rol"
import { Servicios } from "../../../contexts/administrativo/dominio/value-objects/Servicios"
import { Cliente, metodoPago } from "../../../contexts/cliente/dominio/agregados/Cliente"

describe("Reserva Administrativa", () => {
    it("crear desde Persistencia", ()=>{
        const responsable = new Empleado(
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
        const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const reserva:ReservaAdministrativa = ReservaAdministrativa.crearDesdePersistencia({
            id: "1",
            estado: estados["en curso"],
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date("2023-10-01"),
            checkOut: new Date("2023-10-05"),
            responsable: responsable,
            tipoReserva: "administracion",
            extras: null,
            notasInternas: null
        })
        expect(reserva.id).toBe("1")
        expect(reserva.estado).toBe("en curso")
        expect(reserva.asignacion).toBe(cliente)
        expect(reserva.habitacion).toBe(habitacion)
        expect(reserva.checkIn).toBeInstanceOf(Date)
        expect(reserva.checkOut).toBeInstanceOf(Date)
        expect(reserva.responsable).toBe(responsable)
        expect(reserva.tipoReserva).toBe("administracion")
        expect(reserva.extras).toBeNull()
        expect(reserva.notasInternas).toBeNull()
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
            const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const dto:DTOReserva = {
            id: "1",
            estado: estados.aceptada,
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            responsable: admin,
            tipoReserva: tipoReserva.administracion,
            extras: null,
            notasInternas: null
        }
        const reserva = ReservaAdministrativa.crearDesdeDTO(dto);
        expect(reserva.id).toBe(dto.id);
        expect(reserva.estado).toBe(dto.estado);
        expect(reserva.asignacion).toBe(dto.asignacion);
        expect(reserva.habitacion).toBe(dto.habitacion);
        expect(reserva.responsable).toBe(dto.responsable);
        expect(reserva.tipoReserva).toBe(dto.tipoReserva);
        expect(reserva.checkIn).toBe(dto.checkIn);
        expect(reserva.checkOut).toBe(dto.checkOut);
        expect(reserva.extras).toBe(dto.extras);
        expect(reserva.notasInternas).toBe(dto.notasInternas);
    })
        
    it("modificar desde DTO (estado de reserva)", () => {
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
        const cliente = new Cliente(
            "1",
            "Juan Perez",
            "juan.perez@example.com",
            "Calle Falsa 123",
            "password123",
            metodoPago.Tarjeta
        )
        const dto:DTOReserva = {
            id: "1",
            estado: estados["en curso"],
            asignacion: cliente,
            habitacion: habitacion,
            checkIn: new Date(),
            checkOut: new Date(),
            responsable: admin,
            tipoReserva: tipoReserva.administracion,
            extras: null,
            notasInternas: null
        }
        const reserva = new ReservaAdministrativa(
            "1",
            estados.aceptada,
            cliente,
            habitacion,
            new Date(),
            new Date(),
            admin,
            tipoReserva.administracion,
            null,
            null
        )
        reserva.modificarDesdeDTO(dto);
        expect(reserva.id).toBe(dto.id);
        expect(reserva.estado).toBe(dto.estado);
        expect(reserva.asignacion).toBe(dto.asignacion);
        expect(reserva.habitacion).toBe(dto.habitacion);
        expect(reserva.responsable).toBe(dto.responsable);
        expect(reserva.tipoReserva).toBe(dto.tipoReserva);
        expect(reserva.checkIn).toBe(dto.checkIn);
        expect(reserva.checkOut).toBe(dto.checkOut);
        expect(reserva.extras).toBe(dto.extras);
        expect(reserva.notasInternas).toBe(dto.notasInternas);
    })
})