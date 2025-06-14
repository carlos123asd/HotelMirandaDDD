import { HydratedDocument } from "mongoose";
import { ReservaCliente } from "../../dominio/agregados/ReservaCliente";
import { IReservaCliente } from "../interfaces/IReservaCliente";
import { IClienteRepo } from "../../dominio/repositorios/IClienteRepo";
import { IHabitacionRepo } from "../../../../contexts/administrativo/dominio/repositorios/IHabitacionRepo";
import { ServiciosExtras } from "../../../../contexts/administrativo/dominio/value-objects/ServiciosExtras";
import { Servicios } from "../../../../contexts/administrativo/dominio/value-objects/Servicios";
import { ReservaClienteModelo } from "../models/ReservaClienteModelo";

export class ReservaClienteMapper{

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
        return ReservaCliente.crearDesdePersistencia({
            id:doc._id.toString(),
            asignacion:cliente,
            habitacion:habitacion,
            checkIn:doc.checkIn,
            checkOut:doc.checkOut,
            tipoReserva:doc.tipoReserva,
            estadoReserva:doc.estadoReserva,
            extras:serviciosExtras,
        })
    }

    static async desdeDocumentoArray(deps:{
            clienteRepo:IClienteRepo,
            habitacionRepo:IHabitacionRepo,
        },docs:HydratedDocument<IReservaCliente>[]):Promise<ReservaCliente[]>{
        return Promise.all(docs.map((doc) => this.desdeDocumento(deps,doc)));
    }

    static aDocumento(reserva:ReservaCliente){
        let extras = reserva.extras?.length ? reserva.extras.map((extra) => extra.nombre) : null

        const doc:Partial<IReservaCliente> = {
            _id:reserva.id.toString(),
            idCliente:reserva.asignacion.id.toString(),
            idHabitacion:reserva.habitacion.id.toString(),
            checkIn:reserva.checkIn,
            checkOut:reserva.checkOut,
            tipoReserva:reserva.tipoReserva,
            estadoReserva:reserva.estadoReserva,
            extras:extras,
        }   
        return new ReservaClienteModelo(doc)
    }
}