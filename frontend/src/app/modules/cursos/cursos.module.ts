import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListComponent } from './components/cursos-list/cursos-list.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CursosRoutingModule, CursosListComponent]
})
export class CursosModule {}
