import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PensumService {
  private baseUrl = `${environment.apiUrl}/pensum`;

  constructor(private http: HttpClient) {}

  getVisual(): Observable<any> {
    return this.http.get(`${this.baseUrl}/visual`);
  }

  getTopologicalSort(): Observable<any> {
    return this.http.get(`${this.baseUrl}/topological-sort`);
  }

  detectCycles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/detect-cycles`);
  }

  bfs(codigo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/bfs/${codigo}`);
  }

  dfs(codigo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/dfs/${codigo}`);
  }

  getPrerequisites(codigo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${codigo}/prerequisites`);
  }

  shortestPath(from: string, to: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/path/${from}/${to}`);
  }

  addCurso(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cursos`, data);
  }

  removeCurso(codigo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cursos/${codigo}`);
  }

  addPrerrequisito(from: string, to: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/prerrequisito`, { from, to });
  }

  removePrerrequisito(from: string, to: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/prerrequisito/${from}/${to}`);
  }
}
