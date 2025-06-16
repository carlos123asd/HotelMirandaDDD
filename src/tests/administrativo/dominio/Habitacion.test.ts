import { DTOHabitacion } from "../../../contexts/administrativo/aplicacion/dtos/DTOHabitacion"
import { categoriaHabitacion, Habitacion } from "../../../contexts/administrativo/dominio/agregados/Habitacion"
import { Servicios } from "../../../contexts/administrativo/dominio/value-objects/Servicios"

describe("Habitacion", () => {
    it("crear desde Persistencia",() => {
        const habitacion = Habitacion.crearDesdePersistencia({
            id: "1",
            nombre: "Habitacion Deluxe",
            descripcion: "Habitacion con vista al mar",
            precio: 150,
            oferta: 10,
            categoria: categoriaHabitacion.Suite,
            servicios: [Servicios.WIFI, Servicios.BUFFET],
            imagenes: ["image1.jpg", "image2.jpg"],
            piso: "2",
            codigo: "D123"
        })

        expect(habitacion.id).toBe("1")
        expect(habitacion.nombre).toBe("Habitacion Deluxe")
        expect(habitacion.descripcion).toBe("Habitacion con vista al mar")
        expect(habitacion.precio).toBe(150)
        expect(habitacion.oferta).toBe(10)
        expect(habitacion.categoria).toBe('Suite')
        expect(habitacion.servicios).toContain(Servicios.WIFI)
        expect(habitacion.imagenes.length).toBe(2)
        expect(habitacion.piso).toBe("2")
        expect(habitacion.codigo).toBe("D123")
    })

    it("crear desde DTO", () => {
            const codigo = "D123";
            const dto:DTOHabitacion = {
                id: "1",
                nombre: "Carlos Medina Salas",
                descripcion: "habitacion con vista al mar",
                precio: 150,
                oferta: 23,
                categoria: categoriaHabitacion.Suite,
                servicios: [Servicios.WIFI, Servicios.BUFFET],
                imagenes: [],
                piso: "2"
            }
            const habitacion = Habitacion.crearDesdeDTO(dto,codigo);
            expect(habitacion.id).toBe(dto.id);
            expect(habitacion.nombre).toBe(dto.nombre);
            expect(habitacion.descripcion).toBe(dto.descripcion);
            expect(habitacion.precio).toBe(dto.precio);
            expect(habitacion.oferta).toBe(dto.oferta);
            expect(habitacion.categoria).toBe(dto.categoria);
            expect(habitacion.servicios).toEqual(dto.servicios);
            expect(habitacion.imagenes).toEqual(dto.imagenes);
            expect(habitacion.piso).toBe(dto.piso);
            expect(habitacion.codigo).toBe(codigo);
    })
    
    it("modificar desde DTO (precio,oferta)", () => {
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
        const dto:DTOHabitacion = {
            id: "1",
            nombre: "Carlos Medina Salas",
            descripcion: "habitacion con vista al mar",
            precio: 200,
            oferta: 15,
            categoria: categoriaHabitacion.Suite,
            servicios: [Servicios.WIFI, Servicios.BUFFET],
            imagenes: [],
            piso: "2",
            codigo: "D123"
        }
        habitacion.modificarDesdeDTO(dto);
        expect(habitacion.id).toBe(dto.id);
        expect(habitacion.nombre).toBe(dto.nombre);
        expect(habitacion.descripcion).toBe(dto.descripcion);
        expect(habitacion.precio).toBe(dto.precio);
        expect(habitacion.oferta).toBe(dto.oferta);
        expect(habitacion.categoria).toBe(dto.categoria);
        expect(habitacion.servicios).toEqual(dto.servicios);
        expect(habitacion.imagenes).toEqual(dto.imagenes);
        expect(habitacion.piso).toBe(dto.piso);
        expect(habitacion.codigo).toBe(dto.codigo);
    })
})