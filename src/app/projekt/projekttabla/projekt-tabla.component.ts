import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {ProjektDto} from '../projektdto';

@Component({
  selector: 'app-projekt-tabla',
  templateUrl: './projekt-tabla.component.html'
})
export class ProjektTablaComponent implements OnDestroy {
  @Input() Dto: ProjektDto[] = new Array<ProjektDto>();
  @Input() megjegyzesIs = true;
  @Input() enIdclick = true;

  @Input() ujTemplate: TemplateRef<any>;
  @Input() egyTemplate: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  ujtetel = false;

  clearselections() {
    this.ujtetel = false;

    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  ujtetelstart() {
    this.clearselections();

    this.ujtetel = true;
  }
  ujtetelstop() {
    this.ujtetel = false;
  }

  clickforid(i: number) {
    this.ujtetel = false;

    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
    this.ujtetel = false;

    this.clickedrowindex = i;
    // először clickforid aztán clickforrow is, clickforrow felülírná az eseményeket
    if (this.clickedrowindex !== this.clickedidindex) {
      this.clickedidindex = -1;
      this.forid.emit(-1);
    }
  }


  MuszakiallapotColor(muszakiallapot: string) {
    switch (muszakiallapot) {
      case 'Nincs elkezdve a kivitelezése':
        return 'yellow';
      case 'Elkezdve a kivitelezése':
        return 'blue';
      case 'Beüzemelve, hiányos':
        return 'aquamarine';
      case 'Beüzemelve, átadva':
        return 'green';
      default:
        return 'silver';
    }
  }
  InverterNapelemColor(inverterallapot: string) {
    switch (inverterallapot) {
      case 'Inverter: Nincs megrendelve':
      case 'Napelem: Nincs megrendelve':
      case 'Nincs megrendelve':
        return 'red';
      case 'Inverter: Megrendelve':
      case 'Napelem: Megrendelve':
      case 'Megrendelve':
        return 'yellow';
      case 'Inverter: Raktárban':
      case 'Napelem: Raktárban':
      case 'Raktárban':
        return 'blue';
      case 'Inverter: Kiszállítva/beépítve':
      case 'Napelem: Kiszállítva/telepítve':
      case 'Kiszállítva/telepítve':
        return 'aquamarine';
      case 'Inverter: Harmadik fél biztosítja':
      case 'Napelem: Harmadik fél biztosítja':
      case 'Harmadik fél biztosítja':
        return 'fuchsia';
      default:
        return 'silver';
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
