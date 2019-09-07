import {Component, ElementRef, HostListener, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {KapcsolatihaloService} from '../kapcsolatihalo.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {UgyfelkapcsolatDto} from '../../ugyfelkapcsolat/ugyfelkapcsolatdto';
import cytoscape from 'cytoscape';
import contextMenus from 'cytoscape-context-menus';
import {KapcsolatihaloPos} from '../kapcsolatihalopos';
import {propCopy} from '../../tools/propCopy';

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
            'font-size': '10',
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
        {
          selector: ':selected',
          style: {
            'background-color': '#FDDFB3',
            'transition-property': 'background-color',
            'transition-duration': '0.5s'
          }
        }
      ],
      wheelSensitivity: 0.2
    });

    this.cy.on('drag', 'node', evt => {
      // console.log(this.cy.nodes()[0].position());

      const id = evt.target.data().id;
      if (this.moved.indexOf(id) < 0) {
        this.moved.push(id);
        // console.log(this.moved);
      }
    });
  }

  onFrissites() {
    this.cy.elements().remove();
    this.nodes = new Array<UgyfelDto>();
    this.edges = new Array<UgyfelkapcsolatDto>();
    this.moved = new Array<number>();

    this.eppFrissit = true;
    this._kapcsolatihaloservice.StartReader()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.readerciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  readerciklus() {
    this._kapcsolatihaloservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.status === 'Queued' || res.status === 'Running') {
          this._szamlalo = setInterval(() => { this.readernext(); }, 1000);
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

  readernext() {
    clearInterval(this._szamlalo);
    this.readerciklus();
  }

  cytodraw() {
    this.nodes.forEach(x => {
      this.cy.add({
        group: 'nodes',
        data: {
          id: x.Ugyfelkod,
          name: x.Nev + '\n' + x.Helysegnev + '\n' + x.Ceg + '\n' + x.Beosztas + '\n' + x.Tevekenyseg,
          width: 120,
          height: 10 + 5 * 12
        },
        position: {
          x: x.Halox ? x.Halox : 0,
          y: x.Haloy ? x.Haloy : 0
        }
      });
    });

    this.edges.forEach(x => {
      this.cy.add({
        group: 'edges',
        data: {
          id: x.Ugyfelkapcsolatkod,
          source: x.Fromugyfelkod,
          target: x.Tougyfelkod
        }
      });
    });

    this.cy.center();
  }

  onMentes() {
    const pos = new Array<KapcsolatihaloPos>();

    this.moved.forEach(muk => {
      const elp = this.cy.getElementById(muk).position();
      const ugyfelDto = this.nodes.find(udto => udto.Ugyfelkod == muk);
      const p = new KapcsolatihaloPos(muk, elp.x, elp.y, ugyfelDto.Modositva);

      pos.push(p);
    });

    this.eppFrissit = true;
    this._kapcsolatihaloservice.StartWriter(pos)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.writerciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  writerciklus() {
    this._kapcsolatihaloservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.status === 'Queued' || res.status === 'Running') {
          this._szamlalo = setInterval(() => { this.writernext(); }, 1000);
        }

        if (res.status === 'Completed') {
          res.lstUgyfelDto.forEach(dto => {
            const i = this.nodes.findIndex(udto => udto.Ugyfelkod == dto.Ugyfelkod);
            propCopy(dto, this.nodes[i]);
          });

          this.moved = [];
          this.eppFrissit = false;
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  writernext() {
    clearInterval(this._szamlalo);
    this.writerciklus();
  }

  ngOnDestroy() {
    this.cy.removeAllListeners();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
