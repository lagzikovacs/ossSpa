import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output,
  TemplateRef
} from '@angular/core';
import {ProjektDto} from '../projektdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-tabla',
  templateUrl: './projekt-tabla.component.html'
})
export class ProjektTablaComponent implements OnDestroy {
  @Input() Dto: ProjektDto[] = new Array<ProjektDto>();
  @Input() megjegyzesIs = true;
  @Input() enIdclick = true;

  @Input() egyTemplate: TemplateRef<any>;

  @Output() forid = new EventEmitter<number>();

  clickedrowindex = -1;
  clickedidindex = -1;
  egytetel = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  clearselections() {
    this.clickedrowindex = -1;
    this.clickedidindex = -1;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  egytetelstart() {
    this.egytetel = true;

    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  clickforid(i: number) {
    this.clickedidindex = i;
    this.clickedrowindex = this.clickedidindex;

    this.forid.emit(this.clickedidindex);
  }

  clickforrow(i: number) {
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
