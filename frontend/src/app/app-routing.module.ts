import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  {
    path: 'estudiantes',
    loadChildren: () => import('./modules/estudiantes/estudiantes.module').then(m => m.EstudiantesModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./modules/cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: 'catedraticos',
    loadChildren: () => import('./modules/catedraticos/catedraticos.module').then(m => m.CatedraticosModule)
  },
  {
    path: 'pensum',
    loadChildren: () => import('./modules/pensum/pensum.module').then(m => m.PensumModule)
  },
  { path: '**', redirectTo: 'estudiantes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
