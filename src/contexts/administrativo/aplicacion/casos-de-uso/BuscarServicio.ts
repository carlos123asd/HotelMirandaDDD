import { Servicio } from "../../dominio/agregados/Servicio";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";

export class BuscaServicio {
    constructor(
        private readonly servicioRepo: IServicioRepo
    ){}

    async obtenerPorId(idServicio:string):Promise<Servicio>{
        const servicio = await this.servicioRepo.obtenerPorId(idServicio)     
        if(!servicio){
            throw new Error("No se encontro servicio con este ID")
        }  
        return servicio
    }

    async obtenerTodos():Promise<Servicio[]>{
        const servicios = await this.servicioRepo.obtenerTodos()
        if(!servicios){
            throw new Error("No se encontro ningun servicio")
        }
        return servicios
    }
}