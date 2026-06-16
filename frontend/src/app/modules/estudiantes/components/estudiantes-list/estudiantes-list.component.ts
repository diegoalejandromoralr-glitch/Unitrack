import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EstudiantesService } from '../../services/estudiantes.service';
import { EstudiantesFormComponent } from '../estudiantes-form/estudiantes-form.component';
import { LinkedListVisualComponent } from '../linked-list-visual/linked-list-visual.component';
import { HistorialVisualComponent } from '../historial-visual/historial-visual.component';

@Component({
  selector: 'app-estudiantes-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    EstudiantesFormComponent,
    LinkedListVisualComponent,
    HistorialVisualComponent
  ],
  templateUrl: './estudiantes-list.component.html',
  styleUrl: './estudiantes-list.component.scss'
})
export class EstudiantesListComponent implements OnInit {
  estudiantes: any[] = [];
  visualNodes: any[] = [];
  historialNodes: any[] = [];
  selectedCarnet: string | null = null;
  selectedEstudiante: any = null;
  showForm = false;
  displayedColumns = ['carnet', 'nombre', 'apellido', 'carrera', 'semestre', 'acciones'];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.estudiantesService.getAll().subscribe(res => {
      this.estudiantes = res.data || [];
    });
    this.estudiantesService.getVisual().subscribe(res => {
      this.visualNodes = res.nodes || [];
    });
  }

  selectEstudiante(est: any): void {
    this.selectedCarnet = est.carnet;
    this.selectedEstudiante = est;
    this.estudiantesService.getHistorial(est.carnet).subscribe(res => {
      this.historialNodes = res.nodes || [];
    });
  }

  onNodeClick(data: any): void {
    this.selectEstudiante(data);
  }

  invertirLista(): void {
    this.estudiantesService.invertirLista().subscribe(() => this.loadData());
  }

  deleteEstudiante(carnet: string): void {
    if (confirm(`¿Eliminar estudiante ${carnet}?`)) {
      this.estudiantesService.delete(carnet).subscribe(() => {
        if (this.selectedCarnet === carnet) {
          this.selectedCarnet = null;
          this.historialNodes = [];
        }
        this.loadData();
      });
    }
  }

  sortHistorial(campo: string): void {
    if (!this.selectedCarnet) return;
    this.estudiantesService.sortHistorial(this.selectedCarnet, campo).subscribe(() => {
      this.estudiantesService.getHistorial(this.selectedCarnet!).subscribe(res => {
        this.historialNodes = res.nodes || [];
      });
    });
  }

  onEstudianteSaved(): void {
    this.showForm = false;
    this.loadData();
  }
}
