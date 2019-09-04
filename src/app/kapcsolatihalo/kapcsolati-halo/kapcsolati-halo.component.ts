import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import cytoscape from 'cytoscape';
import contextMenus from 'cytoscape-context-menus';
import {KapcsolatihaloService} from '../kapcsolatihalo.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {UgyfelkapcsolatDto} from '../../ugyfelkapcsolat/ugyfelkapcsolatdto';

cytoscape.use(contextMenus, $);

@Component({
  selector: 'app-kapcsolati-halo',
  templateUrl: './kapcsolati-halo.component.html',
  styleUrls: ['./kapcsolati-halo.component.css']
})
export class KapcsolatiHaloComponent implements OnInit {
  @ViewChild('akDiv', {static: true}) akDiv: ElementRef;
  @ViewChild('cy', {static: true}) CytoDiv: ElementRef;

  windowheight = 0;
  cytowidth = 0;
  cytoheight = 0;

  nodes: UgyfelDto[];
  edges: UgyfelkapcsolatDto[];

  tasktoken = '';
  private _szamlalo: any;

  eppFrissit = false;

  constructor(private _errorservice: ErrorService,
              private _kapcsolatihaloservice: KapcsolatihaloService) {
    this.windowheight = window.innerHeight;
  }

  ngOnInit() {
    this.cytosize();

    this.eppFrissit = true;
    this._kapcsolatihaloservice.TaskStartNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ciklus() {
    this._kapcsolatihaloservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.status === 'Queued' || res.status === 'Running') {
          this._szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.status === 'Completed') {
          this.nodes = res.lstUgyfelDto;
          this.edges = res.lstUgyfelkapcsolatDto;

          this.eppFrissit = false;

          this.go();
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  next() {
    clearInterval(this._szamlalo);
    this.ciklus();
  }

  go() {
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

    this.nodes.forEach(x => {
      cy.add({ group: 'nodes', data: { id: x.Ugyfelkod, name: x.Nev, width: 100 }, position: { x: 10, y: 10 } });
    });
    this.edges.forEach(x => {
      cy.add({ group: 'edges', data: { id: x.Ugyfelkapcsolatkod, source: x.Fromugyfelkod, target: x.Tougyfelkod } });
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
