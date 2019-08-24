import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape';
import contextMenus from 'cytoscape-context-menus';

cytoscape.use(contextMenus, $);

@Component({
  selector: 'app-kapcsolati-halo',
  templateUrl: './kapcsolati-halo.component.html',
  styleUrls: ['./kapcsolati-halo.component.css']
})
export class KapcsolatiHaloComponent implements OnInit, AfterViewInit {
  @ViewChild('akDiv', {static: true}) akDiv: ElementRef;
  @ViewChild('cy', {static: true}) CytoDiv: ElementRef;

  windowheight = 0;
  cytowidth = 0;
  cytoheight = 0;

  constructor() {
    this.windowheight = window.innerHeight;
  }

  ngOnInit() {
    this.cytosize();
  }

  ngAfterViewInit() {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(name)',
            'width': 'data(width)',
            'height': 'data(height)',
            'shape': 'roundrectangle',
            'color': 'black',
            'text-wrap': 'wrap',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': 'white',
            'text-max-width': '90',
            'font-size': '9',
            'border-color': '#a79d93',
            'border-width': 1,
            'border-opacity': 1
          }
        }
      ]
    });

    const eles = cy.add([
      { group: 'nodes', data: { id: 'n0', name: 'Lagzi-Kovács Sándor \r\n GridSolar Group Kft.', width: 100 }, position: { x: 100, y: 100 } },
      { group: 'nodes', data: { id: 'n1' }, position: { x: -200, y: 200 } },
      { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
    ]);

    cy.center();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.stopPropagation();
    event.preventDefault();

    this.windowheight = event.target.innerHeight;
    this.cytosize();
  }

  cytosize() {
    this.cytowidth = this.akDiv.nativeElement.offsetWidth - 16;
    this.cytoheight = this.windowheight - 160;
  }
}
