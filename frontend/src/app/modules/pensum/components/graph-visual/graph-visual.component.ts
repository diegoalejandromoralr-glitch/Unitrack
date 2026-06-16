declare module 'vis-network';

import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Network } from 'vis-network';

@Component({
  selector: 'app-graph-visual',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './graph-visual.component.html',
  styleUrl: './graph-visual.component.scss'
})
export class GraphVisualComponent implements OnChanges, OnDestroy {
  @Input() graphData: { nodes: any[]; edges: any[] } = { nodes: [], edges: [] };
  @Input() bfsResult: any[] = [];
  @Input() dfsResult: any[] = [];
  @Input() topologicalOrder: any[] = [];
  @Input() selectedNodeId: string | null = null;
  @Input() prerequisiteIds: string[] = [];
  @Input() unlocksIds: string[] = [];

  @ViewChild('networkContainer', { static: true }) networkRef!: ElementRef<HTMLDivElement>;

  private network: Network | null = null;
  animationStep = -1;
  animationMode: 'bfs' | 'dfs' | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['graphData'] || changes['selectedNodeId'] || changes['prerequisiteIds'] || changes['unlocksIds']) {
      this.renderNetwork();
    }
  }

  ngOnDestroy(): void {
    this.network?.destroy();
  }

  renderNetwork(): void {
    if (!this.graphData?.nodes?.length) return;

    const nodes = this.graphData.nodes.map(n => {
      let color = '#1E3A5F';
      if (this.prerequisiteIds.includes(n.id)) color = '#28A745';
      else if (this.unlocksIds.includes(n.id)) color = '#2E75B6';
      else if (n.id === this.selectedNodeId) color = '#FFA500';

      return {
        id: n.id,
        label: n.label || n.id,
        color: { background: color, border: '#333' },
        font: { color: 'white' }
      };
    });

    const edges = this.graphData.edges.map((e, i) => ({
      id: i,
      from: e.from,
      to: e.to,
      arrows: 'to',
      color: { color: '#666' }
    }));

    const data = { nodes, edges };
    const options = {
      physics: { enabled: true, stabilization: { iterations: 100 } },
      interaction: { dragNodes: true, dragView: true },
      layout: { improvedLayout: true }
    };

    if (this.network) {
      this.network.setData(data);
    } else {
      this.network = new Network(this.networkRef.nativeElement, data, options);
    }
  }

  startBfsAnimation(): void {
    this.animationMode = 'bfs';
    this.animationStep = 0;
  }

  startDfsAnimation(): void {
    this.animationMode = 'dfs';
    this.animationStep = 0;
  }

  nextAnimationStep(): void {
    const max = this.animationMode === 'bfs' ? this.bfsResult.length : this.dfsResult.length;
    if (this.animationStep < max - 1) {
      this.animationStep++;
    }
  }

  get animationData(): any[] {
    return this.animationMode === 'bfs' ? this.bfsResult : this.dfsResult;
  }

  get currentAnimationNode(): any {
    if (this.animationStep < 0 || !this.animationData.length) return null;
    return this.animationData[this.animationStep];
  }
}
