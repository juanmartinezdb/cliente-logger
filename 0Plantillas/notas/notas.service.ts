import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {


  constructor() { }
  
  //suscripciones
  private cambioEmpleadoSubject = new BehaviorSubject<any>(null);
  cambiosEmpleados$ = this.cambioEmpleadoSubject.asObservable();

  //el value le pasa datos a los subscritos
  updateEmployee(value : any) {
    this.cambioEmpleadoSubject.next(value); //next es el que avisa de que hay cambios
  }
}
