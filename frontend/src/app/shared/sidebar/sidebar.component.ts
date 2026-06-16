import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  modules = [
    { path: '/estudiantes', label: 'Estudiantes', icon: 'people', structure: 'Lista Enlazada Simple' },
    { path: '/cursos', label: 'Cursos', icon: 'account_tree', structure: 'Árbol AVL' },
    { path: '/catedraticos', label: 'Catedráticos', icon: 'table_chart', structure: 'Tabla Hash' },
    { path: '/pensum', label: 'Pensum', icon: 'hub', structure: 'Grafo Dirigido' }
  ];
}
