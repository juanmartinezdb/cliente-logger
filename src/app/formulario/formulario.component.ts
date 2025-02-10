import { DatosService } from './../services/datos.service';
import { Empleado } from './../model/persona.model';
import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { Sucursal } from '../model/sucursal.model';
import { Habitacion } from '../model/habitacion.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  empleados: Empleado[] = [];
  sucurcales : Sucursal[] = [];
  habitaciones : Habitacion[] = [];
  datosService: DatosService = inject(DatosService);
  formH : FormGroup;

  constructor(private fb: FormBuilder) {
    this.datosService.getAllEmpleados().then((empleados: Empleado[]) => {
      this.empleados = empleados;
    });
    this.datosService.getAllSucursales().then((sucurcales : Sucursal[])=> {
      this.sucurcales = sucurcales;

      this.formH= this.fb.group({

      });
    })

  }
    onSucursalChange(event : Event){
      const codigo = (event.target as HTMLSelectElement).value;
      const sucusalChecked = this.sucurcales.find(s => s.codigo===codigo);
      if (sucusalChecked){
        this.habitaciones = sucusalChecked.habitaciones;
      }
    }

    submit() {
      console.log(this.form);

    }

}
