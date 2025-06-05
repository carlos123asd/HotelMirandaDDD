export default interface IEmpleado {
    _id:string,
    email:string,
    photo:string,
    startDate:Date,
    telefono:string,
    codigo:string,
    nombre:string,
    password:string,
    rol:string,
    permisosExtra:Array<object>,
    status:string
}