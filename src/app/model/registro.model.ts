export interface Registro {

    hotel: string;        
    empleado: string;     
  
    nombreC: string;
    apellidoC: string;
    habitacionC: string;
    agencia?: string;     
    telefonoC: string;
  

    tituloE: string;
    descripcionE: string;
    categoria: 'registro' | 'incidencia' | 'alerta';
    tipoE: string;        
    fechaE: string;       
    horaE: string;        
  
 
    fechaCreacion: string; 
    departamento: string; 
  }
  