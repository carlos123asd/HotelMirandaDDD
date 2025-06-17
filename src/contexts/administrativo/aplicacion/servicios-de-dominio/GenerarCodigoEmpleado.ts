export function GenerarCodigoEmpleado(email:string,telefono:string):string {
    const emailPart = email.split('@')[0];
    const telefonoPart = telefono.replace(/\D/g, '').slice(-4);
    return `${emailPart}${telefonoPart}`;
}