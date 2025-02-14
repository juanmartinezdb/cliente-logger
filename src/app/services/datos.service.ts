import { inject, Injectable } from '@angular/core';
import { Predefinida } from '../model/predefinida.model';
import { Empleado } from '../model/persona.model';
import { Sucursal } from '../model/sucursal.model';
import { Registro } from '../model/registro.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DatosService {

  private predefinidasUrl = 'http://localhost:3000/predefinidas';
  private empleadosUrl = 'http://localhost:3000/empleados';
  private sucursalesUrl = 'http://localhost:3000/sucursales';
  private registrosUrl = 'http://localhost:3000/registros';

  //preguntar por como van los observables y revisar
  private registrosSubject = new BehaviorSubject<Registro[]>([]);
  registros$: Observable<Registro[]> = this.registrosSubject.asObservable();

  http = inject(HttpClient);
  constructor() {
  }
  getAllEmpleados = () => this.http.get<Empleado[]>(this.empleadosUrl);
  getAllSucursales = () => this.http.get<Sucursal[]>(this.sucursalesUrl);
  getAllPredefinidas = () => this.http.get<Predefinida[]>(this.predefinidasUrl);

  //con httpCliente no tengo otra forma de hacerlo que no sea con el pipe y el tap
  //si no lo hago asi no me escucha bien el contador de navBar, si acaso le busco otra logica para
  //pillar los contadores
  getAllRegistros = () => {
    return this.http.get<Registro[]>(this.registrosUrl).pipe(
      tap(registros => this.registrosSubject.next(registros))
    );
  };

  addRegistro = (nuevoRegistro: Registro) => this.http.post(this.registrosUrl, nuevoRegistro);

  //deleteRegistro.

  // async getAllPredefinidas(): Promise<Predefinida[]> {
  //   const data = await fetch(this.predefinidasUrl);
  //   return (await data.json()) ?? [];
  // }

  // async getAllEmpleados(): Promise<Empleado[]> {
  //   const data = await fetch(this.empleadosUrl);
  //   return (await data.json()) ?? [];
  // }
  // async getAllSucursales(): Promise<Sucursal[]> {
  //   const data = await fetch(this.sucursalesUrl);
  //   return (await data.json()) ?? [];
  // }


  // async getAllRegistros(): Promise<Registro[]> {
  //   const data = await fetch(this.registrosUrl);
  //   const registros = (await data.json()) ?? [];
  //   this.registrosSubject.next(registros);
  //   return registros;
  // }

  //cambiar a httpClient
  // async addRegistro(nuevoRegistro: Registro): Promise<void> {
  //   const response = await fetch(this.registrosUrl, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(nuevoRegistro)
  //   });

  //   if (response.ok) {
  //     const registrosActualizados = [...this.registrosSubject.getValue(), nuevoRegistro];
  //     this.registrosSubject.next(registrosActualizados);
  //   } else {
  //     console.error('Error al agregar registro');
  //   }
  // }

}

//cambiar a httpClient y ver como funcionan las funciones como observables
//probar si hay errores, y como controla los catch si devuelve un null o undefinded
