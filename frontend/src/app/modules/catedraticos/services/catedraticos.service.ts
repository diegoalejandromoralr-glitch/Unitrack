import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CatedraticosService {
  private baseUrl = `${environment.apiUrl}/catedraticos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getVisual(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visual`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getByCode(codigo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}`);
  }

  insert(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(codigo: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${codigo}`, data);
  }

  delete(codigo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codigo}`);
  }

  cambiarConfig(hashFunc: string, collisionMethod: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/config`, { hashFunc, collisionMethod });
  }
}
