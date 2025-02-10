import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private registrosUrl = 'http://localhost:3000/registros';

  constructor(private http: HttpClient) { }

  guardarRegistro(registro: any): Observable<any> {
    return this.http.post(this.registrosUrl, registro);
  }
}
