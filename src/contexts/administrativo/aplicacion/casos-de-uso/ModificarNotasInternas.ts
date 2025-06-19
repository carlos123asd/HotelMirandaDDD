import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { DTONotasInternas } from "../dtos/DTONotasInternas";

export class ModificarNotasInternas{
    constructor(
        private readonly notasrepo:INotasInternasRepo
    ){}

    async ejecutar(dtoNotas:DTONotasInternas,modificar:boolean):Promise<void>{
        const notaEncontrada = await this.notasrepo.buscarId(dtoNotas.id)
        if(!notaEncontrada){
            throw new Error(`No se encontor ninguna Nota Interna con esta ID:${dtoNotas.id}`)
        }
        notaEncontrada.modificarDesdeDTO(dtoNotas)
        await this.notasrepo.guardar(notaEncontrada,modificar)
    }
}