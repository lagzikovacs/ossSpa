import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {ProjektDto} from '../../02 Eszkozok/01 Projekt/projekt/projektdto';

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
        return ['yellow', 'black'];
      case 'Elkezdve a kivitelezése':
        return ['blue', 'white'];
      case 'Beüzemelve, hiányos':
        return ['aquamarine', 'black'];
      case 'Beüzemelve, átadva':
        return ['green', 'white'];
      default:
        return ['silver', 'black'];
    }
  }
  InverterNapelemColor(inverterallapot: string) {
    switch (inverterallapot) {
      case 'Inverter: Nincs megrendelve':
      case 'Napelem: Nincs megrendelve':
      case 'Nincs megrendelve':
        return ['red', 'white'];
      case 'Inverter: Megrendelve':
      case 'Napelem: Megrendelve':
      case 'Megrendelve':
        return ['yellow', 'black'];
      case 'Inverter: Raktárban':
      case 'Napelem: Raktárban':
      case 'Raktárban':
        return ['blue', 'white'];
      case 'Inverter: Kiszállítva/beépítve':
      case 'Napelem: Kiszállítva/telepítve':
      case 'Kiszállítva/telepítve':
        return ['aquamarine', 'black'];
      case 'Inverter: Harmadik fél biztosítja':
      case 'Napelem: Harmadik fél biztosítja':
      case 'Harmadik fél biztosítja':
        return ['fuchsia', 'white'];
      default:
        return ['silver', 'black'];
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
