import { DatosService } from './../services/datos.service';
import { Registro } from './../model/registro.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Empleado } from '../model/persona.model';
import { DetallesEventoComponent } from '../detalles-evento/detalles-evento.component';

@Component({
    selector: 'app-listado',
    standalone: true,
    imports: [CommonModule, DetallesEventoComponent],
    templateUrl: './listado.component.html',
    styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  registros: Registro[] = [];

  datosService: DatosService = inject(DatosService);
  registroSelect : Registro| null = null;

  constructor() {

  }


  ngOnInit(): void {
    this.datosService.getAllRegistros().then((reg: Registro[]) => {
      this.registros = reg;
    });
    console.log(this.registros);

  }



  mostrarDetalles(reg: Registro): void {
    this.registroSelect = reg;
  }
}
