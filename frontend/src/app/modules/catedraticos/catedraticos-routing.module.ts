import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatedraticosListComponent } from './components/catedraticos-list/catedraticos-list.component';

const routes: Routes = [{ path: '', component: CatedraticosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatedraticosRoutingModule {}
