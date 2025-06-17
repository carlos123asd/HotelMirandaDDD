export default interface IHabitacion {
    _id:string,
    nombre:string,
    descripcion:string,
    precio:number,
    oferta:number,
    categoria:string,
    servicios:string[],
    imagenes:string[],
    piso:string,
    codigo:string
}