import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';

@Component({
  selector: 'app-historial-visual',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './historial-visual.component.html',
  styleUrl: './historial-visual.component.scss'
})
export class HistorialVisualComponent implements OnChanges {
  @Input() nodes: any[] = [];
  @ViewChild('svgContainer', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  currentIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.currentIndex = 0;
      this.render();
    }
  }

  get currentNode(): any {
    return this.nodes[this.currentIndex] || null;
  }

  anterior(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  siguiente(): void {
    if (this.currentIndex < this.nodes.length - 1) {
      this.currentIndex++;
      this.render();
    }
  }

  render(): void {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();

    if (!this.nodes.length) return;

    const nodeWidth = 160;
    const nodeHeight = 70;
    const gap = 60;
    const totalWidth = Math.max(this.nodes.length * (nodeWidth + gap) + 40, 500);
    svg.attr('viewBox', `0 0 ${totalWidth} 200`);

    this.nodes.forEach((node, i) => {
      const x = i * (nodeWidth + gap) + 20;
      const y = 60;
      const isActive = i === this.currentIndex;

      svg.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', nodeWidth).attr('height', nodeHeight)
        .attr('rx', 8)
        .style('fill', isActive ? '#2E75B6' : '#1E3A5F')
        .style('stroke', isActive ? '#FFA500' : 'none')
        .style('stroke-width', 2);

      svg.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'white').style('font-size', '11px')
        .text(`Curso: ${node.data?.codigoCurso || ''}`);

      svg.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 42)
        .attr('text-anchor', 'middle')
        .style('fill', '#A8D8EA').style('font-size', '10px')
        .text(`${node.data?.semestre || ''} | Nota: ${node.data?.nota ?? ''}`);

      if (node.hasPrev) {
        svg.append('text')
          .attr('x', x - 15).attr('y', y + nodeHeight / 2 + 4)
          .attr('text-anchor', 'middle')
          .style('fill', '#FFA500').style('font-size', '16px')
          .text('←');
      }

      if (node.hasNext) {
        svg.append('line')
          .attr('x1', x + nodeWidth).attr('y1', y + nodeHeight / 2)
          .attr('x2', x + nodeWidth + gap).attr('y2', y + nodeHeight / 2)
          .style('stroke', '#FFA500').style('stroke-width', 2);

        svg.append('polygon')
          .attr('points', `${x + nodeWidth + gap},${y + nodeHeight / 2 - 5} ${x + nodeWidth + gap + 10},${y + nodeHeight / 2} ${x + nodeWidth + gap},${y + nodeHeight / 2 + 5}`)
          .style('fill', '#FFA500');
      }
    });
  }
}
