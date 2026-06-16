import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CatedraticosService } from '../../services/catedraticos.service';

@Component({
  selector: 'app-catedraticos-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './catedraticos-form.component.html',
  styleUrl: './catedraticos-form.component.scss'
})
export class CatedraticosFormComponent {
  @Output() saved = new EventEmitter<void>();

  catedratico = { codigo: '', nombre: '', apellido: '', especialidad: '', correo: '' };

  constructor(private catedraticosService: CatedraticosService) {}

  submit(): void {
    this.catedraticosService.insert(this.catedratico).subscribe(() => {
      this.saved.emit();
      this.catedratico = { codigo: '', nombre: '', apellido: '', especialidad: '', correo: '' };
    });
  }
}
