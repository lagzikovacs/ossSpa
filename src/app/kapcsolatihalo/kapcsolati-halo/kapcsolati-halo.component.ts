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
    console.log(document.getElementById('cy'));

    cytoscape({

      container: document.getElementById('cy'),

      elements: [ // flat array of nodes and edges
        { // node n1
          group: 'nodes', // 'nodes' for a node, 'edges' for an edge
          // NB the group field can be automatically inferred for you but specifying it
          // gives you nice debug messages if you mis-init elements


          data: { // element data (put json serialisable dev data here)
            id: 'n1', // mandatory (string) id for each element, assigned automatically on undefined
            parent: 'nparent', // indicates the compound node parent id; not defined => no parent
            // (`parent` can be effectively changed by `eles.move()`)
          },

          // scratchpad data (usually temp or nonserialisable data)
          scratch: {
            _foo: 'bar' // app fields prefixed by underscore; extension fields unprefixed
          },

          position: { // the model position of the node (optional on init, mandatory after)
            x: 100,
            y: 100
          },

          selected: false, // whether the element is selected (default false)

          selectable: true, // whether the selection state is mutable (default true)

          locked: false, // when locked a node's position is immutable (default false)

          grabbable: true, // whether the node can be grabbed and moved by the user

          pannable: false, // whether dragging the node causes panning instead of grabbing

          classes: ['foo', 'bar'] // an array (or a space separated string) of class names that the element has
        },

        { // node n2
          data: { id: 'n2' },
          renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
        },

        { // node n3
          data: { id: 'n3', parent: 'nparent' },
          position: { x: 123, y: 234 }
        },

        { // node nparent
          data: { id: 'nparent' }
        },

        { // edge e1
          data: {
            id: 'e1',
            // inferred as an edge because `source` and `target` are specified:
            source: 'n1', // the source node id (edge comes from this node)
            target: 'n2'  // the target node id (edge goes to this node)
            // (`source` and `target` can be effectively changed by `eles.move()`)
          },

          pannable: true // whether dragging on the edge causes panning
        }
      ],

      layout: {
        name: 'preset'
      },

      // so we can see the ids
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(id)'
          }
        }
      ]

    });
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
