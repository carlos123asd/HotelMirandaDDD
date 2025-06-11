import { IClienteRepo } from "../../../cliente/dominio/repositorios/IClienteRepo";
import { estados, ReservaAdministrativa, tipoReserva } from "../../dominio/agregados/ReservaAdministrativa";
import { IEmpleadoRepo } from "../../dominio/repositorios/IEmpleadoRepo";
import { IHabitacionRepo } from "../../dominio/repositorios/IHabitacionRepo";
import { INotasInternasRepo } from "../../dominio/repositorios/INotasInternasRepo";
import { Servicios } from "../../dominio/value-objects/Servicios";
import { ServiciosExtras } from "../../dominio/value-objects/ServiciosExtras";

export class ReservaAdministrativaMapper{

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

    private static servicionsExtras(values:string[]):ServiciosExtras[]{
        return values.map((servicio:string) => {
            return this.comprobarServicio(servicio)    
        })
    }

    private static checkTipoReserva(value:string){
        switch(value){
            case 'administracion': return tipoReserva.administracion
            case 'cliente': return tipoReserva.cliente
            default: throw new Error("Tipo de Reserva invalida")
        }
    }

    private static checkEstado = (value:string) => {
        switch(value){
            case 'pendiente': return estados.pendiente
            case 'aceptada': return estados.aceptada
            case 'en curso': return estados["en curso"]
            case 'cancelada': return estados.cancelada
            default: throw new Error("Estadp de Reserva invalida")
        }
    }

    static async desdeDocumento(deps:{
        clienteRepo:IClienteRepo,
        habitacionRepo:IHabitacionRepo,
        empleadoRepo:IEmpleadoRepo,
        notasInternasRepo:INotasInternasRepo
    },doc:any):Promise<ReservaAdministrativa>{
        const cliente = await deps.clienteRepo.buscarPorId(doc.idCliente)
        const habitacion = await deps.habitacionRepo.buscarPorId(doc.idHabitacion)
        const empleado = await deps.empleadoRepo.buscarPorId(doc.idEmpleado)
        
        if(!cliente || !habitacion || !empleado){
            throw new Error("No se encontro coincidencias para este Cliente, faltan datos relevates como cliente,habitacion,empleado")
        }
        const serviciosExtras = this.servicionsExtras(doc.extras)
        const notasInternas = await deps.notasInternasRepo.buscarPorReserva(doc._id)
        
        return new ReservaAdministrativa(
            doc._id.toString(),
            this.checkEstado(doc.estado),
            cliente,
            habitacion,
            doc.checkIn,
            doc.checkOut,
            empleado,
            this.checkTipoReserva(doc.tipoReserva),
            serviciosExtras,
            notasInternas,
        )
    }
    static async desdeDocumentoArray(deps:{
        clienteRepo:IClienteRepo,
        habitacionRepo:IHabitacionRepo,
        empleadoRepo:IEmpleadoRepo,
        notasInternasRepo:INotasInternasRepo
    },docs:any):Promise<ReservaAdministrativa[]>{
        return Promise.all(docs.map(async (doc:any) => {
                const cliente = await deps.clienteRepo.buscarPorId(doc.idCliente)
                const habitacion = await deps.habitacionRepo.buscarPorId(doc.idHabitacion)
                const empleado = await deps.empleadoRepo.buscarPorId(doc.idEmpleado)
                
                if(!cliente || !habitacion || !empleado){
                    throw new Error("No se encontro coincidencias para este Cliente, faltan datos relevates como cliente,habitacion,empleado")
                }
                const serviciosExtras = this.servicionsExtras(doc.extras)
                const notasInternas = await deps.notasInternasRepo.buscarPorReserva(doc._id)

                return new ReservaAdministrativa(
                doc._id.toString(),
                this.checkEstado(doc.estado),
                cliente,
                habitacion,
                doc.checkIn,
                doc.checkOut,
                empleado,
                this.checkTipoReserva(doc.tipoReserva),
                serviciosExtras,
                notasInternas,
                )
            })
        )
    }
}