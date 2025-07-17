import { Servicio } from "../../dominio/agregados/Servicio";
import { IServicioRepo } from "../../dominio/repositorios/IServicioRepo";

export class ServicioRepoMongo implements IServicioRepo {

    guardar(extra: Servicio): Promise<void> {
        throw new Error("Method not implemented.");
    }
    obtenerPorId(id: string): Promise<Servicio | null> {
        throw new Error("Method not implemented.");
    }
    obtenerTodos(): Promise<Servicio[]> {
        throw new Error("Method not implemented.");
    }
    eliminar(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}