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
this.cargarRegistros()
  }
  getAllEmpleados = () => this.http.get<Empleado[]>(this.empleadosUrl);
  getAllSucursales = () => this.http.get<Sucursal[]>(this.sucursalesUrl);
  getAllPredefinidas = () => this.http.get<Predefinida[]>(this.predefinidasUrl);

  //con httpCliente no tengo otra forma de hacerlo que no sea con el pipe y el tap
  //si no lo hago asi no me escucha bien el contador de navBar, si acaso le busco otra logica para
  //pillar los contadores
  cargarRegistros(): void {
    this.http.get<Registro[]>(this.registrosUrl).subscribe({
      next: registros => this.registrosSubject.next(registros),
      error: err => console.error("Error al obtener registros:", err)
    });
  }

  addRegistro = (nuevoRegistro: Registro) => this.http.post(this.registrosUrl, nuevoRegistro);

  borrarRegistro(id: string): void {
    this.http.delete(`${this.registrosUrl}/${id}`).subscribe({
      next: () => {
        console.log(`Registro con ID ${id} eliminado`);
        this.cargarRegistros();
      },
      error: err => console.error("Error al eliminar el registro:", err)
    });
  }

}

