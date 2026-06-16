import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumRoutingModule } from './pensum-routing.module';
import { PensumMapComponent } from './components/pensum-map/pensum-map.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PensumRoutingModule, PensumMapComponent]
})
export class PensumModule {}
