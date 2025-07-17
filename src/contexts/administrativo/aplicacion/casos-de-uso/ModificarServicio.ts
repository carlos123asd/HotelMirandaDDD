import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";
import { DTOServicio } from "../dtos/DTOServicio";

export class ModificarServicio {
    constructor(
        private readonly servicioRepo: IServicioRepo
    ){}

    async ejecutar(dto: DTOServicio): Promise<void> {
        const servicioExistente = await this.servicioRepo.obtenerPorId(dto.id);
        if (!servicioExistente) {
            throw new Error("No existe un servicio con este ID");
        }

        servicioExistente.modificarDesdeDTO(dto);
        await this.servicioRepo.guardar(servicioExistente, true);
    }
}