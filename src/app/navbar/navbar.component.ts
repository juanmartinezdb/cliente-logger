import { DatosService } from './../services/datos.service';
import { Registro } from './../model/registro.model';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule} from '@angular/router';
import { routes } from '../app.routes';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  ordinario: number = 0;
  incidencia: number = 0;
  alerta: number = 0;

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.datosService.registros$.subscribe((registros: Registro[]) => {
      this.contarCategorias(registros);
    });


    this.datosService.getAllRegistros();
  }

  contarCategorias(registros: Registro[]): void {
    this.ordinario = registros.filter(r => r.categoria === 'registro').length;
    this.incidencia = registros.filter(r => r.categoria === 'incidencia').length;
    this.alerta = registros.filter(r => r.categoria === 'alerta').length;
  }
}
