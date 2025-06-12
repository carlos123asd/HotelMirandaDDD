import { HydratedDocument } from "mongoose";
import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IReservaCliente } from "../interfaces/IReservaCliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { IHabitacionRepo } from "../../../administrativo/dominio/repositorios/IHabitacionRepo";
import { tipoReserva } from "../../../administrativo/dominio/agregados/ReservaAdministrativa";
import { ServiciosExtras } from "../../../administrativo/dominio/value-objects/ServiciosExtras";
import { Servicios } from "../../../administrativo/dominio/value-objects/Servicios";

export class ReservaClienteMapper{

    private static checkTipoReserva(value:string){
        switch(value){
            case 'administracion': return tipoReserva.administracion
            case 'cliente': return tipoReserva.cliente
            default: throw new Error("Tipo de Reserva invalida")
        }
    }

    private static comprobarServicio(value:string):Servicios{
        switch(value){
            case Servicios.BUFFET.nombre: return Servicios.BUFFET
            case Servicios.SPA.nombre: return Servicios.SPA
            case Servicios.PISCINA.nombre: return Servicios.PISCINA
            case Servicios.GIMNASIO.nombre: return Servicios.GIMNASIO
            case Servicios.LAVANDERIA.nombre: return Servicios.LAVANDERIA
            case Servicios.TRANSPORTE.nombre: return Servicios.TRANSPORTE
            case Servicios.TOUR.nombre: return Servicios.TOUR
            case Servicios.TV.nombre: return Servicios.TV
            case Servicios.WIFI.nombre: return Servicios.WIFI
            default:
                throw new Error(`Servicio desconocido: ${value}`);
        }
    }

    private static serviciosExtras(values:string[]):ServiciosExtras[]{
            return values.map((servicio:string) => {
                return this.comprobarServicio(servicio)    
            })
    }

    static async desdeDocumento(deps:{
            clienteRepo:IClienteRepo,
            habitacionRepo:IHabitacionRepo,
        },doc:HydratedDocument<IReservaCliente>):Promise<ReservaCliente>{
        const cliente = await deps.clienteRepo.buscarPorId(doc.idCliente)
        const habitacion = await deps.habitacionRepo.buscarPorId(doc.idHabitacion)
        
        if(!cliente || !habitacion){
            throw new Error("No se encontro coincidencias para este Cliente, faltan datos relevates como cliente,habitacion")
        }
        const serviciosExtras = doc.extras ? this.serviciosExtras(doc.extras) : null
        return new ReservaCliente(
            doc._id.toString(),
            cliente,
            habitacion,
            doc.checkIn,
            doc.checkOut,
            this.checkTipoReserva(doc.tipoReserva),
            serviciosExtras,
        )
    }

    static async desdeDocumentoArray(deps:{
            clienteRepo:IClienteRepo,
            habitacionRepo:IHabitacionRepo,
        },docs:HydratedDocument<IReservaCliente>[]):Promise<ReservaCliente[]>{
        return Promise.all(docs.map((doc) => this.desdeDocumento(deps,doc)));
    }
}