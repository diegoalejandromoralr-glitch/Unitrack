import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PensumMapComponent } from './components/pensum-map/pensum-map.component';

const routes: Routes = [{ path: '', component: PensumMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PensumRoutingModule {}
