import { DatosService } from './../services/datos.service';
import { Registro } from './../model/registro.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Empleado } from '../model/persona.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  registros: Registro[] = [];
  empleados: Empleado[] = [];
  datosService: DatosService = inject(DatosService);

  constructor() {

  }


  ngOnInit(): void {
    this.datosService.getAllRegistros().then((reg: Registro[]) => {
      this.registros = reg;
    });
    this.datosService.getAllEmpleados().then((empl: Empleado[]) => {
      this.empleados = empl;
    });
    console.log(this.registros);

  }

  getEmpleadobyId(id: string) : Empleado {
    return this.empleados.find(e=> (e.id.toString())==id)!;
  }
}
