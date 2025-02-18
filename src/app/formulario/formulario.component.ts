import { Registro } from './../model/registro.model';
import { Predefinida } from './../model/predefinida.model';
import { DatosService } from './../services/datos.service';
import { Empleado } from './../model/persona.model';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { Sucursal } from '../model/sucursal.model';
import { Habitacion } from '../model/habitacion.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  empleados: Empleado[] = [];
  // registros: Registro[] = []; //catetada como un templo parte 1
  sucursales: Sucursal[] = [];
  predefinidas: Predefinida[] = [];
  predefinidasAll: Predefinida[] = [];
  habitaciones: Habitacion[] = [];
  datosService: DatosService = inject(DatosService);
  formH: FormGroup;
  registro!: Registro;
  agencia: boolean = false;
  datosEvento: boolean = false;
  registrosLista: Registro[] = [];


  constructor(
    private fb: FormBuilder,
    // private registroService: RegistroService
  ) {
    this.formH = this.fb.group({
      nombreHotel: ['', [Validators.required]],
      empleado: ['', [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      apellidosCliente: ['', [Validators.required]],
      habitacion: ['', [Validators.required]],
      agencia: ['', [Validators.required]],
      agenciaT: [''],
      telefono: ['', [Validators.required]],
      tituloEvento: ['', [Validators.required]],
      descripcionEvento: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      predefinidos: [''],
      fechaRegistrada: ['', [Validators.required]],
      horaRegistrada: ['', [Validators.required]],
      createdAt: [new Date()]
    });

  }
  ngOnInit(): void {
    this.datosService.getAllEmpleados().subscribe(value => this.empleados = value);
    this.datosService.getAllSucursales().subscribe(value => this.sucursales = value);
    this.datosService.getAllPredefinidas().subscribe(value => this.predefinidasAll = value);
    this.datosService.registros$.subscribe ( r => this.registrosLista = r);


    this.formH.get('nombreHotel')?.valueChanges.subscribe((n: string) => {
      this.habitaciones = this.sucursales.find(s => s.codigo === n)!.habitaciones;
    })
    this.formH.get('tipo')?.valueChanges.subscribe((t: string) => {
      this.predefinidas = this.predefinidasAll.filter(p => p.tipo === t);
    })
    this.formH.get('predefinidos')?.valueChanges.subscribe((t: string) => {
      const predef = this.predefinidas.find(p => p.id == t);
      this.formH.patchValue({
        tituloEvento: predef?.nombre,
        descripcionEvento: predef?.descripcion
      })
      if (t) {
        this.datosEvento = true;
      } else {
        this.datosEvento = false;

      }
      console.log(predef?.id);

    })
  }

  onSucursalChange(event: Event) {
    const codigo = (event.target as HTMLSelectElement).value;
    const sucusalChecked = this.sucursales.find(s => s.codigo === codigo);
    if (sucusalChecked) {
      this.habitaciones = sucusalChecked.habitaciones;
    }
  }
  onAgenciaCheck(check: boolean) {
    this.agencia = check;

  }


  submit() {
    if (this.formH.valid) {
      const now = new Date();

      const nuevoRegistro: Registro = {
        id: (Number(this.registrosLista[this.registrosLista.length-1].id)+1).toString(),
        hotel: this.formH.value.nombreHotel,
        empleado: this.formH.value.empleado,
        nombreC: this.formH.value.nombreCliente,
        apellidoC: this.formH.value.apellidosCliente,
        habitacionC: this.formH.value.habitacion,
        agencia: this.formH.value.agencia ? this.formH.value.agenciaT : '',
        telefonoC: this.formH.value.telefono,
        tituloE: this.formH.value.tituloEvento,
        descripcionE: this.formH.value.descripcionEvento,
        categoria: this.formH.value.tipo,
        predefinido: this.formH.value.predefinidos,
        fechaE: this.formH.value.fechaRegistrada,
        horaE: this.formH.value.horaRegistrada,
        creacion: now
      };
      console.log(this.formH.value);
      console.log("Registro a enviar:", nuevoRegistro);

      this.datosService.addRegistro(nuevoRegistro).subscribe();
    }
  }
}
