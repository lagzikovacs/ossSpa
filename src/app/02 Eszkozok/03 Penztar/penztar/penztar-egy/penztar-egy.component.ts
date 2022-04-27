import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {PenztarService} from '../penztar.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {EgyMode} from '../../../../common/enums/egymode';
import {PenztarDto} from '../penztardto';
import {deepCopy} from '../../../../common/deepCopy';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../../common/propCopy';
import {PenztarSzerkesztesComponent} from '../penztar-szerkesztes/penztar-szerkesztes.component';
import {PenztarExportComponent} from '../penztar-export/penztar-export.component';
import {PenztartetelListComponent} from '../../penztartetel/penztartetel-list/penztartetel-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztar-egy',
  templateUrl: './penztar-egy.component.html'
})
export class PenztarEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_penztar', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 13;
  Dto = new PenztarDto();
  @Input() set dto(value: PenztarDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<PenztarDto> = new EventEmitter<PenztarDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<PenztarDto> = new EventEmitter<PenztarDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  penztarservice: PenztarService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              penztarservice: PenztarService) {
    super();

    this.penztarservice = penztarservice;
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
        const ujC = this.vcr.createComponent(PenztarSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.penztarservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.penztarservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.penztarservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(PenztarSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Tetelek: // 13
        const tetelekC = this.vcr.createComponent(PenztartetelListComponent);
        tetelekC.instance.Penztarkod = this.Dto.Penztarkod;
        tetelekC.instance.nyitva = this.Dto.Nyitva;
        tetelekC.instance.eventFrissits.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doReread();
        });
        break;
      case EgyMode.Export: // 14
        const exportC = this.vcr.createComponent(PenztarExportComponent);
        exportC.instance.Penztarkod = this.Dto.Penztarkod;
        break;
    }
  }

  doUjkesz(dto: PenztarDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.penztarservice.Delete(this.Dto);
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

  doModositaskesz(dto: PenztarDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  async doReread() {
    this.spinner = true;
    try {
      const res = await this.penztarservice.ReadById(this.Dto.Penztarkod);
      if (res.Error != null) {
        throw res.Error;
      }

      propCopy(res.Result[0], this.Dto);
      this.spinner = false;

      this.eventModositas.emit(res.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
