import { Injectable } from '@angular/core';
import { Predefinida } from '../model/predefinida.model';
import { Empleado } from '../model/persona.model';
import { Sucursal } from '../model/sucursal.model';

@Injectable({
  providedIn: 'root'
})

export class DatosService {

  predefinidasUrl = 'http://localhost:3000/predefinidas';
  empleadosUrl = 'http://localhost:3000/empleados';
  sucursalesUrl = 'http://localhost:3000/sucursales';

  async getAllPredefinidas(): Promise<Predefinida[]> {
    const data = await fetch(this.predefinidasUrl);
    return (await data.json()) ?? [];
  }

  async getAllEmpleados(): Promise<Empleado[]> {
    const data = await fetch(this.empleadosUrl);
    return (await data.json()) ?? [];
  }
  async getAllSucursales(): Promise<Sucursal[]> {
    const data = await fetch(this.sucursalesUrl);
    return (await data.json()) ?? [];
  }

}
