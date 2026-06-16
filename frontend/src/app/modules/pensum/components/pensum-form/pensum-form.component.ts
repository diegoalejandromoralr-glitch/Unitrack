import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { PensumService } from '../../services/pensum.service';

@Component({
  selector: 'app-pensum-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule],
  templateUrl: './pensum-form.component.html',
  styleUrl: './pensum-form.component.scss'
})
export class PensumFormComponent {
  @Output() saved = new EventEmitter<void>();

  curso = { codigo: '', nombre: '' };
  prerrequisito = { from: '', to: '' };

  constructor(private pensumService: PensumService) {}

  addCurso(): void {
    this.pensumService.addCurso(this.curso).subscribe(() => {
      this.saved.emit();
      this.curso = { codigo: '', nombre: '' };
    });
  }

  addPrerrequisito(): void {
    this.pensumService.addPrerrequisito(this.prerrequisito.from, this.prerrequisito.to).subscribe(() => {
      this.saved.emit();
      this.prerrequisito = { from: '', to: '' };
    });
  }
}
