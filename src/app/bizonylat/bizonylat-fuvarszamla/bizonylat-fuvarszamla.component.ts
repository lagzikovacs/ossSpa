import {Component, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';

@Component({
  selector: 'app-bizonylat-fuvarszamla',
  templateUrl: './bizonylat-fuvarszamla.component.html'
})
export class BizonylatFuvarszamlaComponent implements OnDestroy {
  @Input() dtoAnyagszamla: BizonylatDto;
  @Output() eventOK = new EventEmitter<BizonylatDto>();

  eppFrissit = false;
  EgyMode = 0;

  doPage(i: number) {
    this.EgyMode = i;
  }

  onMegsem() {
    this.EgyMode = 0;
  }

  onOK(dtoMod: BizonylatDto) {
    this.eventOK.emit(dtoMod);
    this.EgyMode = 0;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
