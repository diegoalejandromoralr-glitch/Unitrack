import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatedraticosService } from '../../services/catedraticos.service';
import { CatedraticosFormComponent } from '../catedraticos-form/catedraticos-form.component';
import { HashTableVisualComponent } from '../hash-table-visual/hash-table-visual.component';

@Component({
  selector: 'app-catedraticos-list',
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    CatedraticosFormComponent, HashTableVisualComponent
  ],
  templateUrl: './catedraticos-list.component.html',
  styleUrl: './catedraticos-list.component.scss'
})
export class CatedraticosListComponent implements OnInit {
  catedraticos: any[] = [];
  visualData: any = null;
  showForm = false;
  displayedColumns = ['codigo', 'nombre', 'apellido', 'especialidad', 'acciones'];

  constructor(private catedraticosService: CatedraticosService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.catedraticosService.getAll().subscribe(res => this.catedraticos = res.data || []);
    this.catedraticosService.getVisual().subscribe(res => this.visualData = res);
  }

  onConfigChange(config: { hashFunc: string; collisionMethod: string }): void {
    this.catedraticosService.cambiarConfig(config.hashFunc, config.collisionMethod).subscribe(() => this.loadData());
  }

  deleteCatedratico(codigo: string): void {
    if (confirm(`¿Eliminar catedrático ${codigo}?`)) {
      this.catedraticosService.delete(codigo).subscribe(() => this.loadData());
    }
  }

  onSaved(): void {
    this.showForm = false;
    this.loadData();
  }
}
