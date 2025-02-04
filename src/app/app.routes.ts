import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoComponent } from './listado/listado.component';

export const routes: Routes = [
  { path: '', component: FormularioComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'formulario', component: FormularioComponent }
];
