import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  TemplateRef
} from '@angular/core';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {BizonylatTipus} from "../../bizonylat/bizonylattipus";
import {BizonylatTipusLeiro} from "../../bizonylat/bizonylattipusleiro";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatteteltabla',
  templateUrl: './bizonylatteteltabla.component.html'
})
export class BizonylatteteltablaComponent implements AfterViewInit, OnDestroy {
  @Input() Dto: BizonylatTetelDto[] = new Array<BizonylatTetelDto>();
  @Input() enEdit = false;
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();

  @Output() eventSelected = new EventEmitter<number>();
  @Output() eventTorles = new EventEmitter<boolean>();
  @Output() eventModositas = new EventEmitter<BizonylatTetelDto>();

  clickedrowindex = -1;
  clickedidindex = -1;

  defaultNav = 0;
  modOk = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
    this.modOk = false;

    this.docdr();
  }

  doTorles(i: number) {
    this.egysem();
    this.clickedidindex = i;
    this.eventSelected.emit(i);

    this.defaultNav = 2;
    this.modOk = true;

    this.docdr();
  }

  doModositas(i: number) {
    this.egysem();
    this.clickedidindex = i;
    this.eventSelected.emit(i);

    this.defaultNav = 3;
    this.modOk = true;

    this.docdr();
  }

  onTorles(ok) {
    this.egysem();
    this.eventTorles.emit(ok);
  }

  onModositas(dto) {
    this.egysem();
    this.eventModositas.emit(dto);
  }

  onMegsem() {
    this.egysem();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
