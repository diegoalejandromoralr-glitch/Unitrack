import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CursosService {
  private baseUrl = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getVisual(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visual`);
  }

  getByCode(codigo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}`);
  }

  insert(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  delete(codigo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${codigo}`);
  }

  getInOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/inorden`);
  }

  getPreOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/preorden`);
  }

  getPostOrder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/postorden`);
  }

  getMin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/min`);
  }

  getMax(): Observable<any> {
    return this.http.get(`${this.baseUrl}/max`);
  }

  getHeight(): Observable<any> {
    return this.http.get(`${this.baseUrl}/altura`);
  }
}
