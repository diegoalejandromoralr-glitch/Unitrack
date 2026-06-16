import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PensumService } from '../../services/pensum.service';
import { GraphVisualComponent } from '../graph-visual/graph-visual.component';
import { PensumFormComponent } from '../pensum-form/pensum-form.component';

@Component({
  selector: 'app-pensum-map',
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatSelectModule,
    MatButtonModule, MatInputModule, GraphVisualComponent, PensumFormComponent
  ],
  templateUrl: './pensum-map.component.html',
  styleUrl: './pensum-map.component.scss'
})
export class PensumMapComponent implements OnInit {
  graphData: any = { nodes: [], edges: [] };
  bfsResult: any[] = [];
  dfsResult: any[] = [];
  topologicalOrder: any[] = [];
  hasCycle = false;
  selectedNodeId: string | null = null;
  prerequisiteIds: string[] = [];
  unlocksIds: string[] = [];
  startCodigo = 'MAT101';
  pathFrom = 'MAT101';
  pathTo = 'INF301';
  shortestPath: string[] | null = null;
  showForm = false;

  constructor(private pensumService: PensumService) {}

  ngOnInit(): void {
    this.loadGraph();
  }

  loadGraph(): void {
    this.pensumService.getVisual().subscribe(res => {
      this.graphData = res;
      if (res.nodes?.length && !this.selectedNodeId) {
        this.selectedNodeId = res.nodes[0].id;
        this.onNodeSelect();
      }
    });
    this.pensumService.detectCycles().subscribe(res => this.hasCycle = res.hasCycle);
  }

  onNodeSelect(): void {
    if (!this.selectedNodeId) return;
    this.pensumService.getPrerequisites(this.selectedNodeId).subscribe(res => {
      this.prerequisiteIds = [
        ...res.directos.map((d: any) => d.codigo),
        ...res.indirectos.map((d: any) => d.codigo)
      ];
    });
    this.unlocksIds = this.graphData.edges
      .filter((e: any) => e.from === this.selectedNodeId)
      .map((e: any) => e.to);
    this.runBfs();
    this.runDfs();
  }

  runBfs(): void {
    if (!this.selectedNodeId) return;
    this.pensumService.bfs(this.selectedNodeId).subscribe(res => this.bfsResult = res.data || []);
  }

  runDfs(): void {
    if (!this.selectedNodeId) return;
    this.pensumService.dfs(this.selectedNodeId).subscribe(res => this.dfsResult = res.data || []);
  }

  loadTopologicalSort(): void {
    this.pensumService.getTopologicalSort().subscribe(res => this.topologicalOrder = res.data || []);
  }

  findPath(): void {
    this.pensumService.shortestPath(this.pathFrom, this.pathTo).subscribe(res => {
      this.shortestPath = res.path;
    });
  }

  onSaved(): void {
    this.showForm = false;
    this.loadGraph();
  }
}
