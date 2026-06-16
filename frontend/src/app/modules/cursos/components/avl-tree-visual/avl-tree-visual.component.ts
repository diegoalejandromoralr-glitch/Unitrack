import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';

interface TreeNode {
  name: string;
  data: any;
  balance: number;
  height: number;
  children?: TreeNode[];
}

@Component({
  selector: 'app-avl-tree-visual',
  imports: [MatButtonModule],
  templateUrl: './avl-tree-visual.component.html',
  styleUrl: './avl-tree-visual.component.scss'
})
export class AvlTreeVisualComponent implements OnChanges {
  @Input() treeData: TreeNode | null = null;
  @ViewChild('svgContainer', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  avlMode = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['treeData']) {
      this.render();
    }
  }

  toggleMode(): void {
    this.avlMode = !this.avlMode;
    this.render();
  }

  render(): void {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();

    if (!this.treeData) {
      svg.append('text').attr('x', 20).attr('y', 40).text('Árbol vacío');
      return;
    }

    const root = d3.hierarchy(this.treeData);
    const treeLayout = d3.tree<TreeNode>().size([700, 350]);
    treeLayout(root);

    const g = svg.append('g').attr('transform', 'translate(40, 20)');

    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('d', d3.linkVertical<any, any>()
        .x((d: any) => d.x)
        .y((d: any) => d.y));

    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 28)
      .style('fill', (d: any) => {
        const balance = d.data.balance ?? 0;
        if (this.avlMode && Math.abs(balance) > 1) return '#DC3545';
        return '#1E3A5F';
      })
      .style('stroke', '#FFA500')
      .style('stroke-width', 2);

    node.append('text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '10px')
      .text((d: any) => d.data.name || d.data.data?.codigo || '');

    node.append('text')
      .attr('dy', 45)
      .attr('text-anchor', 'middle')
      .style('fill', '#2C3E50')
      .style('font-size', '10px')
      .text((d: any) => `B:${d.data.balance ?? 0}`);
  }
}
