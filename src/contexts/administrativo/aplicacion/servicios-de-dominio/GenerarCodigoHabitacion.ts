import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";

export class GenerarCodigoHabitacion{
    constructor(
        private readonly repoHabitacion:IHabitacionRepo,
    ){}


    private cadenaPiso(numero:string):string{
        return numero.padStart(2,'0');
    }

    async generar(piso: string):Promise<string>{
        const letras = ['A','B','C','D','E','F','G','H','I','J'] //10 habitaciones por piso
        const numeroHabitaciones = await this.repoHabitacion.ContarHabitaciones();

        const codigo = this.cadenaPiso(piso)+letras[numeroHabitaciones % letras.length]
        const existeCodigo = await this.repoHabitacion.buscarPorCodigo(codigo)
        if(existeCodigo){
            throw  new Error("Ya existe una Habitacion con este codigo")
        }
        return codigo
    }
}