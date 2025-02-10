import { Injectable } from '@angular/core';
import { Predefinida } from '../model/predefinida.model';
import { Empleado } from '../model/persona.model';
import { Sucursal } from '../model/sucursal.model';
import { Registro } from '../model/registro.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DatosService {

  private predefinidasUrl = 'http://localhost:3000/predefinidas';
  private empleadosUrl = 'http://localhost:3000/empleados';
  private sucursalesUrl = 'http://localhost:3000/sucursales';
  private registrosUrl =  'http://localhost:3000/registros';

  //preguntar por como van los observables y revisar
  private registrosSubject = new BehaviorSubject<Registro[]>([]);
  registros$: Observable<Registro[]> = this.registrosSubject.asObservable();

  constructor(){
  }

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
  async getAllRegistros(): Promise<Registro[]> {
    const data = await fetch(this.registrosUrl);
    const registros = (await data.json()) ?? [];
    this.registrosSubject.next(registros);
    return registros;
  }

  async addRegistro(nuevoRegistro: Registro): Promise<void> {
    const response = await fetch(this.registrosUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoRegistro)
    });

    if (response.ok) {
      const registrosActualizados = [...this.registrosSubject.getValue(), nuevoRegistro];
      this.registrosSubject.next(registrosActualizados);
    } else {
      console.error('Error al agregar registro');
    }
  }

}
