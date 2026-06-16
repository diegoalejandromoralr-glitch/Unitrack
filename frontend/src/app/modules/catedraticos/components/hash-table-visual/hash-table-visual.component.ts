import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-hash-table-visual',
  imports: [CommonModule, FormsModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './hash-table-visual.component.html',
  styleUrl: './hash-table-visual.component.scss'
})
export class HashTableVisualComponent implements OnChanges {
  @Input() visualData: any = null;
  @Output() configChange = new EventEmitter<{ hashFunc: string; collisionMethod: string }>();

  hashFunc = 'division';
  collisionMethod = 'chaining';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visualData'] && this.visualData?.stats) {
      this.hashFunc = this.visualData.stats.hashFunc;
      this.collisionMethod = this.visualData.stats.collisionMethod;
    }
  }

  applyConfig(): void {
    this.configChange.emit({ hashFunc: this.hashFunc, collisionMethod: this.collisionMethod });
  }

  getStatusClass(status: string): string {
    if (status === 'occupied') return 'occupied';
    if (status === 'deleted') return 'deleted';
    return 'empty';
  }
}
