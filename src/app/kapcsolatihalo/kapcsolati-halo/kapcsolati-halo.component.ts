import {Component, ElementRef, HostListener, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {KapcsolatihaloService} from '../kapcsolatihalo.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {UgyfelkapcsolatDto} from '../../ugyfelkapcsolat/ugyfelkapcsolatdto';
import cytoscape from 'cytoscape';
import contextMenus from 'cytoscape-context-menus';

cytoscape.use(contextMenus, $);

@Component({
  selector: 'app-kapcsolati-halo',
  templateUrl: './kapcsolati-halo.component.html',
  styleUrls: ['./kapcsolati-halo.component.css']
})
export class KapcsolatiHaloComponent implements OnInit, OnDestroy {
  @ViewChild('akDiv', {static: true}) akDiv: ElementRef;
  @ViewChild('cy', {static: true}) CytoDiv: ElementRef;

  windowheight = 0;
  cytowidth = 0;
  cytoheight = 0;

  nodes = new Array<UgyfelDto>();
  edges = new Array<UgyfelkapcsolatDto>();
  moved = new Array<number>();

  tasktoken = '';
  private _szamlalo: any;

  eppFrissit = false;

  cy: any;

  constructor(private _errorservice: ErrorService,
              private _kapcsolatihaloservice: KapcsolatihaloService) {
    this.windowheight = window.innerHeight;
  }

  ngOnInit() {
    this.cytosize();
    this.cytoinit();
  }

  cytosize() {
    this.cytowidth = this.akDiv.nativeElement.offsetWidth - 16;
    this.cytoheight = this.windowheight - 180;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.stopPropagation();
    event.preventDefault();

    this.windowheight = event.target.innerHeight;
    this.cytosize();
  }

  cytoinit() {
    this.cy = cytoscape({
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
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'font-size': '15',
            'width': 1,
            'line-color': 'black',
            'target-arrow-color': 'black'
          }
        },
      ]
    });

    this.cy.on('drag', 'node', evt => {
      // console.log(this.cy.nodes()[0].position());

      const id = evt.target.data().id;
      if (this.moved.indexOf(id) < 0) {
        this.moved.push(id);
        console.log(this.moved);
      }
    });
  }

  onFrissites() {
    this.cy.elements().remove();
    this.nodes = new Array<UgyfelDto>();
    this.edges = new Array<UgyfelkapcsolatDto>();
    this.moved = new Array<number>();

    this.eppFrissit = true;
    this._kapcsolatihaloservice.TaskStartNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.frissitesciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  frissitesciklus() {
    this._kapcsolatihaloservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.status === 'Queued' || res.status === 'Running') {
          this._szamlalo = setInterval(() => { this.frissitesnext(); }, 1000);
        }

        if (res.status === 'Completed') {
          this.nodes = res.lstUgyfelDto;
          this.edges = res.lstUgyfelkapcsolatDto;

          this.eppFrissit = false;

          this.cytodraw();
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  frissitesnext() {
    clearInterval(this._szamlalo);
    this.frissitesciklus();
  }

  cytodraw() {
    this.nodes.forEach(x => {
      this.cy.add({ group: 'nodes', data: { id: x.Ugyfelkod, name: x.Nev + '\n' + x.Helysegnev + '\n' + x.Ceg + '\n' + x.Beosztas + '\n' + x.Tevekenyseg, width: 100, height: 30 }, position: { x: 10, y: 10 } });
    });
    this.edges.forEach(x => {
      this.cy.add({ group: 'edges', data: { id: x.Ugyfelkapcsolatkod, source: x.Fromugyfelkod, target: x.Tougyfelkod } });
    });

    this.cy.center();
  }

  onMentes() {
    this.moved.forEach(x => {
      console.log(this.cy.getElementById(x).position().x);
    });
  }

  ngOnDestroy() {
    this.cy.removeAllListeners();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
