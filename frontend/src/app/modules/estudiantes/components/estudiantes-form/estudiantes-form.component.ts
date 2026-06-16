import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EstudiantesService } from '../../services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './estudiantes-form.component.html',
  styleUrl: './estudiantes-form.component.scss'
})
export class EstudiantesFormComponent {
  @Output() saved = new EventEmitter<void>();

  estudiante = {
    carnet: '',
    nombre: '',
    apellido: '',
    correo: '',
    fechaNacimiento: '',
    carrera: 'Ingeniería en Sistemas',
    semestreActual: 1
  };
  posicion: string | number = 'end';

  constructor(private estudiantesService: EstudiantesService) {}

  submit(): void {
    this.estudiantesService.insert(this.estudiante, this.posicion).subscribe(() => {
      this.saved.emit();
      this.estudiante = {
        carnet: '', nombre: '', apellido: '', correo: '',
        fechaNacimiento: '', carrera: 'Ingeniería en Sistemas', semestreActual: 1
      };
    });
  }
}
