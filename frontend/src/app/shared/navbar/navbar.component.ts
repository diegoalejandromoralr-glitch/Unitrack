import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  links = [
    { path: '/estudiantes', label: 'Estudiantes' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/catedraticos', label: 'Catedráticos' },
    { path: '/pensum', label: 'Pensum' }
  ];
}
