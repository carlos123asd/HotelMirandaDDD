export enum NivelPermisos {
    CREAR = 1,
    MODIFICAR = 2,
    ELIMINAR = 3
}

export type CodigosPermisos = 'ADM' | 'GR' | 'GE' | 'GH';
export type NivelPermiso = 1 | 2 | 3;

export type PermisoPrimitivo = {
    codigo: CodigosPermisos;
    nivel: NivelPermiso;
    descripcion: string;
};

export class Permiso {
    constructor(
        public readonly codigo: CodigosPermisos,
        public readonly nivel: NivelPermiso,
        public readonly descripcion: string
    ) {}

    puedeCrear(): boolean {
        return this.nivel >= NivelPermisos.CREAR;
    }

    puedeModificar(): boolean {
        return this.nivel >= NivelPermisos.MODIFICAR;
    }

    puedeEliminar(): boolean {
        return this.nivel >= NivelPermisos.ELIMINAR;
    }

    equals(codigo: CodigosPermisos): boolean {
        return codigo === this.codigo;
    }

    static fromPrimitive(value: PermisoPrimitivo[]): Permiso[] {
        if (!Array.isArray(value)) {
            throw new Error("Permisos extras inválidos");
        }

        return value.map((permiso, i) => {
            if (!permiso.codigo || !permiso.descripcion || !permiso.nivel) {
                throw new Error(`Permiso número ${i} inválido`);
            }
            return new Permiso(
                permiso.codigo,
                permiso.nivel,
                permiso.descripcion
            );
        });
    }

    static toPrimitive(permisos: Permiso[]): PermisoPrimitivo[] {
        return permisos.map((permiso, i) => {
            if (!permiso.codigo || !permiso.descripcion || !permiso.nivel) {
                throw new Error(`Permiso número ${i} inválido`);
            }
            return {
                codigo: permiso.codigo,
                nivel: permiso.nivel,
                descripcion: permiso.descripcion
            };
        });
    }
}
