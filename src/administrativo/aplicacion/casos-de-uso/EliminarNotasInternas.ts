import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { DTONotasInternas } from "../dtos/DTONotasInternas";

export class EliminarNotasInternas{
    constructor(
        private readonly notasRepo:INotasInternasRepo
    ){}

    async ejecutar(dtoNotas:DTONotasInternas):Promise<void>{
        const notaEncontrada = await this.notasRepo.buscarId(dtoNotas.id)
        if(!notaEncontrada){
            throw new Error(`Nota no encontrada con este ID: ${dtoNotas.id}`)
        }
        await this.notasRepo.eliminar(dtoNotas.id)
    }
}