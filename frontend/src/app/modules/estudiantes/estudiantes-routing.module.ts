import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesListComponent } from './components/estudiantes-list/estudiantes-list.component';

const routes: Routes = [
  { path: '', component: EstudiantesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule {}
