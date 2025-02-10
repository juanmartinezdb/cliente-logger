import { Habitacion } from "./habitacion.model";
import { Empleado } from "./persona.model";
import { Predefinida } from "./predefinida.model";

export interface Registro {

    hotel: string;
    empleado: string;

    nombreC: string;
    apellidoC: string;
    habitacionC: Habitacion;
    agencia?: string;
    telefonoC: string;

    tituloE: string;
    descripcionE: string;
    categoria: 'registro' | 'incidencia' | 'alerta';
    predefinido: Predefinida;
    fechaE: string;
    horaE: string;

    creacion: Date;
  }
