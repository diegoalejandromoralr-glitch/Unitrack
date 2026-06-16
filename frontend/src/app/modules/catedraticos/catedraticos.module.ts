import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatedraticosRoutingModule } from './catedraticos-routing.module';
import { CatedraticosListComponent } from './components/catedraticos-list/catedraticos-list.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, CatedraticosRoutingModule, CatedraticosListComponent]
})
export class CatedraticosModule {}
