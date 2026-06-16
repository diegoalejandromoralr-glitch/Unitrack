import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CursosService } from '../../services/cursos.service';
import { CursosFormComponent } from '../cursos-form/cursos-form.component';
import { AvlTreeVisualComponent } from '../avl-tree-visual/avl-tree-visual.component';

@Component({
  selector: 'app-cursos-list',
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTabsModule,
    CursosFormComponent, AvlTreeVisualComponent
  ],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.scss'
})
export class CursosListComponent implements OnInit {
  cursos: any[] = [];
  treeData: any = null;
  preOrder: any[] = [];
  postOrder: any[] = [];
  minCurso: any = null;
  maxCurso: any = null;
  treeHeight = 0;
  showForm = false;
  displayedColumns = ['codigo', 'nombre', 'creditos', 'horario', 'acciones'];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.cursosService.getAll().subscribe(res => this.cursos = res.data || []);
    this.cursosService.getVisual().subscribe(res => this.treeData = res);
    this.cursosService.getPreOrder().subscribe(res => this.preOrder = res.data || []);
    this.cursosService.getPostOrder().subscribe(res => this.postOrder = res.data || []);
    this.cursosService.getMin().subscribe(res => this.minCurso = res.data);
    this.cursosService.getMax().subscribe(res => this.maxCurso = res.data);
    this.cursosService.getHeight().subscribe(res => this.treeHeight = res.height);
  }

  deleteCurso(codigo: string): void {
    if (confirm(`¿Eliminar curso ${codigo}?`)) {
      this.cursosService.delete(codigo).subscribe(() => this.loadData());
    }
  }

  onSaved(): void {
    this.showForm = false;
    this.loadData();
  }
}
