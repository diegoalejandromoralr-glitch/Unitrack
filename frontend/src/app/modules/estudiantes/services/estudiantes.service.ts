import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private baseUrl = `${environment.apiUrl}/estudiantes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getVisual(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visual`);
  }

  getByCarnet(carnet: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${carnet}`);
  }

  insert(data: any, posicion: string | number = 'end'): Observable<any> {
    return this.http.post(this.baseUrl, { ...data, posicion });
  }

  delete(carnet: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${carnet}`);
  }

  invertirLista(): Observable<any> {
    return this.http.get(`${this.baseUrl}/invertir`);
  }

  getHistorial(carnet: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${carnet}/historial`);
  }

  getHistorialBackward(carnet: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${carnet}/historial/backward`);
  }

  addInscripcion(carnet: string, data: any, posicion: string = 'end'): Observable<any> {
    return this.http.post(`${this.baseUrl}/${carnet}/historial`, { ...data, posicion });
  }

  deleteInscripcion(carnet: string, curso: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${carnet}/historial/${curso}`);
  }

  sortHistorial(carnet: string, campo: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${carnet}/historial/sort/${campo}`, {});
  }
}
