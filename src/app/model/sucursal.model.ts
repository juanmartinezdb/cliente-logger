import { Habitacion } from './habitacion.model';
export interface Sucursal {

    codigo : string;
    nombre : string;
    telefono : string;
    ubicacion: string;
    habitaciones : Habitacion [];
}
