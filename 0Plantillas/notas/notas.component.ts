import { Component } from '@angular/core';

@Component({
  selector: 'app-notas',
  imports: [],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

  //observable suscripciones //esto iria en un servicio aparte
  this.myForm.get('employee')?.valueChanges.subscribe(value => {
  console.log('bla'), value);
this.notas.updateEmployee(value)
}
}
//y esto donde se le llama para el que observa el observable
this.notas.cambiosEmpleados$.suscribe(value => {
  if (value!== null) {
    console.log("empleado recibido en navbarcomponent", value);

    this.localStorageP.saveData('empleado', value); //actualiza el localStorage
    this.employee = value; //actualiza el employee local del componente

  }
})

this.curEmpService.cambioEmpleado$.subscribe(value => {
  if (value!==null ){
    console.log("empleado recibido en bla", value);
    this.curEmployee = value;

  }
})

//Los servicios se injectan es decir que hacer
// dataService DataService = inject(DataService) es igual que hacer
//constructor (private dataService DataService)
