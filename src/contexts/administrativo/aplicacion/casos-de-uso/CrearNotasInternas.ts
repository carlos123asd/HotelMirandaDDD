import { NotasInternas } from "../../dominio/agregados/NotasInternas";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { DTONotasInternas } from "../dtos/DTONotasInternas";

export class CrearNotasInternas{
    constructor(
        private readonly notasRepo:INotasInternasRepo
    ){}

    async ejecutar(dtoNotas:DTONotasInternas):Promise<void>{
        const existeNotaInterna = await this.notasRepo.buscarId(dtoNotas.id)
        if(existeNotaInterna){
            throw new Error("Ya existe una Nota Interna con ese ID")
        }
        const notaInterna = NotasInternas.crearDesdeDTO(dtoNotas)
        await this.notasRepo.guardar(notaInterna,false)
    }
}