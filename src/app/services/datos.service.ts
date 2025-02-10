import { Injectable } from '@angular/core';
import { Predefinida } from '../model/predefinida.model';
import { Empleado } from '../model/persona.model';
import { Sucursal } from '../model/sucursal.model';

@Injectable({
  providedIn: 'root'
})

export class DatosService {

  predefinidas = 'http://localhost:3000/predefinidas';
  empleados = 'http://localhost:3000/empleados';
  sucursales = 'http://localhost:3000/sucursales';

async getAllPredefinidas(): Promise<Predefinida[]> {
  const data = await fetch(this.predefinidas);
  return (await data.json()) ?? [];
}

async getAllEmpleados(): Promise<Empleado[]> {
  const data = await fetch(this.empleados);
  return (await data.json()) ?? [];
}

async getAllSucursales(): Promise<Sucursal[]> {
  const data = await fetch(this.sucursales);
  return (await data.json()) ?? [];
}

async getPredefinidaByTipo(tipo: string): Promise<Predefinida[]> {
  const data = await fetch(`${this.predefinidas}?tipo=${tipo}`);
  return (await data.json()) ?? [];
}
}
