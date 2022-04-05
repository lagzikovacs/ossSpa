import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {AfakulcsDto} from '../afakulcsdto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {AfakulcsService} from '../afakulcs.service';
import {propCopy} from '../../../common/propCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {AfakulcsSzerkesztesComponent} from '../afakulcs-szerkesztes/afakulcs-szerkesztes.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-afakulcs-egy',
  templateUrl: './afakulcs-egy.component.html'
})
export class AfakulcsEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_afakulcs', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new AfakulcsDto();
  @Input() set dto(value: AfakulcsDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<AfakulcsDto> = new EventEmitter<AfakulcsDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<AfakulcsDto> = new EventEmitter<AfakulcsDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  afakulcsservice: AfakulcsService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              afakulcsservice: AfakulcsService) {
    super();

    this.afakulcsservice = afakulcsservice;
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
        const ujC = this.vcr.createComponent(AfakulcsSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.afakulcsservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.afakulcsservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.afakulcsservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(AfakulcsSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: AfakulcsDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.afakulcsservice.Delete(this.Dto);
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

  doModositaskesz(dto: AfakulcsDto) {
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
