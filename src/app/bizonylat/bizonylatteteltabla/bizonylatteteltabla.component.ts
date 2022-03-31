import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef} from '@angular/core';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html'
})
export class BizonylatteteltablaComponent implements OnDestroy {
  @Input() Dto: BizonylatTetelDto[] = new Array<BizonylatTetelDto>();
  @Input() enEdit = false;
  @Output() eventTorlesElott = new EventEmitter<number>();
  @Output() eventModositasElott = new EventEmitter<number>();

  @Input() ujTemplate: TemplateRef<any>;
  @Input() torlesTemplate: TemplateRef<any>;
  @Input() modTemplate: TemplateRef<any>;

  clickedrowindex = -1;
  clickedidindex = -1;

  ujOk = false;
  torlesOk = false;
  modOk = false;

  clearselections() {
    this.egysem();

    this.clickedrowindex = -1;
    this.clickedidindex = -1;
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
    if (this.clickedrowindex !== this.clickedidindex) {
      this.egysem();
    }
  }

  egysem() {
    this.ujOk = false;
    this.torlesOk = false;
    this.modOk = false;
  }

  doUj() {
    this.clearselections();
    this.ujOk = true;
  }
  dotorles(i: number) {
    this.egysem();
    this.clickedidindex = i;
    this.eventTorlesElott.emit(i);

    this.torlesOk = true;
  }
  domodositas(i: number) {
    this.egysem();
    this.clickedidindex = i;
    this.eventModositasElott.emit(i);

    this.modOk = true;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
