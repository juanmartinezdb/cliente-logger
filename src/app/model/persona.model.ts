export interface Persona {
    nombre: string;
    apellidos: string;
    telefono: string;
}

export interface Cliente extends Persona {
    agencia: string;
    habitacion: string;
}

export interface Empleado extends Persona {
    email: string;
    departamento: string;
}
