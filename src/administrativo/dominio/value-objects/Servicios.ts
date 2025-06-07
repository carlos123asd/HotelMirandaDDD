export class Servicios{
    public static readonly BUFFET = new Servicios("restaurante", 12.00);
    public static readonly SPA = new Servicios("spa", 6.00);
    public static readonly PISCINA = new Servicios("piscina", 4.00);
    public static readonly GIMNASIO = new Servicios("gimnasio", 5.00);
    public static readonly LAVANDERIA = new Servicios("lavanderia", 5.00);
    public static readonly TRANSPORTE = new Servicios("transporte", 15.00);
    public static readonly TOUR = new Servicios("tour", 30.00);
    public static readonly TV = new Servicios("TV", 0);
    public static readonly WIFI = new Servicios("WIFI", 0);
     constructor(
        public readonly nombre:string,
        public readonly precio:number
    ){}
}