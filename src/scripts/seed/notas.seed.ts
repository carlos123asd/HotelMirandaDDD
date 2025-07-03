import {faker} from "@faker-js/faker"
import { MEmpleado } from "../../contexts/administrativo/infraestructura/models/EmpleadoModelo"
import IEmpleado from "../../contexts/administrativo/infraestructura/interfaces/IEmpleado"
import { INotasInternas } from "../../contexts/administrativo/infraestructura/interfaces/INotasInternas"
import { MNotasInternas } from "../../contexts/administrativo/infraestructura/models/NotasInternas"

export const seedNotas = async (count = 10) => {
    const notas:INotasInternas[] = []

    for(let i = 0; i < count; i++){
        const tipo = faker.helpers.arrayElement(['Habitacion', 'Cliente', 'Reserva'])
        notas.push({
            _id: faker.database.mongodbObjectId(),
            idResponsable: "6862c745c5478b8b9372ba36",
            tipo: tipo,
            fecha: faker.date.between({
                from: faker.date.past({ years: 1 }),
                to: new Date(),
            }),
            titulo: faker.lorem.sentence({ min: 3, max: 8 }),
            descripcion: faker.lorem.paragraphs({ min: 1, max: 2 }),
            datosAgregados: null,
            idCliente: tipo === 'Cliente' ? "ac3538cece9af4fbe8d8e6ce" : null,
            idReserva: tipo === 'Reserva' ? "f4e10cffaa2b6b55170df739" : null,
            idHabitacion: tipo === 'Habitacion' ? "cf038bd1aac8cac11a0dd9ca" : null
        });
    }
    await MNotasInternas.deleteMany({});
    await MNotasInternas.insertMany(notas)
    console.log(`${notas.length} notas creadas correctamente`)
}