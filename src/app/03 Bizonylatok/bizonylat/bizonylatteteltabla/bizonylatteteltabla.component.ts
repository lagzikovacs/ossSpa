import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {BizonylatTetelDto} from '../../bizonylattetel/bizonylatteteldto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html'
})
export class BizonylatteteltablaComponent implements AfterViewInit, OnDestroy {
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

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
  }

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
