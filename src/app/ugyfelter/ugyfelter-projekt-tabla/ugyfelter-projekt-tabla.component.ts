import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjektDto} from '../../projekt/projektdto';

@Component({
  selector: 'app-ugyfelter-projekt-tabla',
  templateUrl: './ugyfelter-projekt-tabla.component.html'
})
export class UgyfelterProjektTablaComponent implements OnDestroy {
  @Input() Dto: ProjektDto[] = new Array<ProjektDto>();
  @Input() megjegyzesIs = true;
  @Input() enIdclick = true;

  @Input() selectedrow: number;
  @Output() selectedrowChange = new EventEmitter<number>();

  @Output() forid = new EventEmitter<number>();

  clickforrow(i: number) {
    this.selectedrowChange.emit(i);
  }
  clickforid(i: number) {
    this.forid.emit(i);
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
