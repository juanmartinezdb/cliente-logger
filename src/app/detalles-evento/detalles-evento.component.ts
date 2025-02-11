import { DatosService } from './../services/datos.service';
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { Registro } from '../model/registro.model';
import { Empleado } from '../model/persona.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-evento.component.html',
  styleUrl: './detalles-evento.component.css'
})
export class DetallesEventoComponent implements OnInit{
@Input() registro: Registro | null = null;
datosService: DatosService = inject(DatosService);
empleados: Empleado[] = [];

ngOnInit(): void {

  this.datosService.getAllEmpleados().then((empl: Empleado[]) => {
    this.empleados = empl;
  });

}


getEmpleadobyId(id: string) : Empleado {
  return this.empleados.find(e=> (e.id.toString())==id)!;
}

}
