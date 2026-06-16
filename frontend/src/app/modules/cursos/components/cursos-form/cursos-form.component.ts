import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss'
})
export class CursosFormComponent {
  @Output() saved = new EventEmitter<void>();

  curso = { codigo: '', nombre: '', creditos: 4, horario: '', cupoMaximo: 25 };

  constructor(private cursosService: CursosService) {}

  submit(): void {
    this.cursosService.insert(this.curso).subscribe(() => {
      this.saved.emit();
      this.curso = { codigo: '', nombre: '', creditos: 4, horario: '', cupoMaximo: 25 };
    });
  }
}
