import { Servicio } from "../../dominio/agregados/Servicio";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";
import { DTOServicio } from "../dtos/DTOServicio";

export class CrearServicio {
    constructor(
        private readonly servicioRepo: IServicioRepo
    ){}

    async ejecutar(servicio: DTOServicio): Promise<void> {
        const servicioExistente = await this.servicioRepo.obtenerPorId(servicio.id);
        if (servicioExistente) {
            throw new Error("Ya existe un servicio con este ID");
        }
        const nuevoServicio = Servicio.crearDesdeDTO(servicio);
        
        await this.servicioRepo.guardar(nuevoServicio,false);
    }
}