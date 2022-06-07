import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy,
  OnInit, Output, ViewChild, ViewContainerRef, EventEmitter
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {EgyMode} from '../../../common/enums/egymode';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {BizonylattetelService} from '../bizonylattetel.service';
import {BizonylattetelSzerkesztesComponent} from '../bizonylattetel-szerkesztes/bizonylattetel-szerkesztes.component';
import {BizonylatTipusLeiro} from '../../bizonylat/bizonylattipusleiro';
import {BizonylatTipus} from '../../bizonylat/bizonylattipus';
import {BizonylatTetelDto} from '../bizonylatteteldto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylattetel-egy',
  templateUrl: './bizonylattetel-egy.component.html'
})
export class BizonylattetelEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_bizonylattetel', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() defaultNav = 0;
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() TetelDtoOriginal = new BizonylatTetelDto();

  @Output() eventTorles = new EventEmitter<boolean>();
  @Output() eventModositas = new EventEmitter<BizonylatTetelDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  constructor(private _bizonylattetelservice: BizonylattetelService,
              private _cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    if (this.defaultNav > 0) {
      this.doNav(this.defaultNav);
      this.docdr();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this._bizonylattetelservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doNav(0);
          this.eventTorles.emit(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(BizonylattetelSzerkesztesComponent);
        C.instance.teteluj = false;
        C.instance.bizonylatTipus = this.bizonylatTipus;
        C.instance.bizonylatLeiro = this.bizonylatLeiro;
        C.instance.TetelDtoOriginal = this.TetelDtoOriginal;
        C.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doNav(0);
          this.eventModositas.emit(dto);
        });
        C.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
          this.eventMegsem.emit();
        });
        break;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
