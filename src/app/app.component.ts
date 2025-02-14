import { DatosService } from './services/datos.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Registro } from './model/registro.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  registros: Registro[] = []; //catetada como un templo parte 1 (preguntar)
  datosService = inject(DatosService);
  title = 'Log';

  ngOnInit(): void {
    this.datosService.getAllRegistros().subscribe(value => this.registros = value); //catetada como un templo parte 2 (preguntar)
  }

}
