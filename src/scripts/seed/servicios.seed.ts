import {faker} from "@faker-js/faker"
import { IServicio } from "../../contexts/administrativo/infraestructura/interfaces/IServicio"
import { MServicio } from "../../contexts/administrativo/infraestructura/models/Servicio"

export const seedServicios = async (count = 10) => {
    const servicios:IServicio[] = []

    for(let i = 0; i < count; i++){
        servicios.push({
            _id: faker.database.mongodbObjectId(),
            nombre: `Servicio ${faker.number.int({ min: 1, max: 10 })}`,
            descripcion: faker.lorem.sentences(2),
            precio: Number(faker.number.float({ min: 50, max: 500}).toFixed(2)),
            imagen: faker.image.avatar()
        })
    }
    await MServicio.deleteMany({});
    await MServicio.insertMany(servicios)
    console.log(`${servicios.length} servicios creados correctamente`)
}