import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
http = inject(HttpClient)
  private registrosUrl = 'http://localhost:3000/registros';

  constructor() { }

  guardarRegistro(registro: any): Observable<any> {
    return this.http.post(this.registrosUrl, registro);
  }
}
