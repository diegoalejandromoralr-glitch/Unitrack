import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linked-list-visual',
  imports: [],
  template: `<svg #svgContainer width="100%" height="220"></svg>`,
  styleUrl: './linked-list-visual.component.scss'
})
export class LinkedListVisualComponent implements OnChanges {
  @Input() nodes: any[] = [];
  @Output() nodeClick = new EventEmitter<any>();
  @ViewChild('svgContainer', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.render();
    }
  }

  render(): void {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();

    const nodeWidth = 130;
    const nodeHeight = 60;
    const gap = 50;
    const totalWidth = Math.max(this.nodes.length * (nodeWidth + gap) + 40, 400);
    svg.attr('viewBox', `0 0 ${totalWidth} 220`);

    this.nodes.forEach((node, i) => {
      const x = i * (nodeWidth + gap) + 20;
      const y = 70;
      const g = svg.append('g').style('cursor', 'pointer')
        .on('click', () => this.nodeClick.emit(node.data));

      g.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', nodeWidth).attr('height', nodeHeight)
        .attr('rx', 8)
        .style('fill', '#1E3A5F');

      g.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'white').style('font-size', '12px')
        .text(node.data?.carnet || '');

      g.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 45)
        .attr('text-anchor', 'middle')
        .style('fill', '#A8D8EA').style('font-size', '10px')
        .text(node.data?.nombre || '');

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
