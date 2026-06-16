import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesListComponent } from './components/estudiantes-list/estudiantes-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    EstudiantesListComponent
  ]
})
export class EstudiantesModule {}
