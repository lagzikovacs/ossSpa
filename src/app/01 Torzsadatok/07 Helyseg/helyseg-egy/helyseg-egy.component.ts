import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {HelysegDto} from '../helysegdto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {HelysegService} from '../helyseg.service';
import {propCopy} from '../../../common/propCopy';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {EgyMode} from '../../../common/enums/egymode';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {HelysegSzerkesztesComponent} from '../helyseg-szerkesztes/helyseg-szerkesztes.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-helyseg-egy',
  templateUrl: './helyseg-egy.component.html'
})
export class HelysegEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_helyseg', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new HelysegDto();
  @Input() set dto(value: HelysegDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<HelysegDto> = new EventEmitter<HelysegDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<HelysegDto> = new EventEmitter<HelysegDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  helysegservice: HelysegService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              helysegservice: HelysegService) {
    super();

    this.helysegservice = helysegservice;
  }

  ngAfterViewInit() {
    if (this.uj) {
      this.doNav(EgyMode.Uj);
      this.docdr();
    }

    if (!this.uj && this.defaultNav > 0) {
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
      case EgyMode.Uj: // -1
        const ujC = this.vcr.createComponent(HelysegSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.helysegservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.helysegservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.helysegservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(HelysegSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: HelysegDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.helysegservice.Delete(this.Dto);
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinner = false;
        this.doNav(0);

        this.eventTorles.emit();
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.doNav(0);
    }
  }

  doModositaskesz(dto: HelysegDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
