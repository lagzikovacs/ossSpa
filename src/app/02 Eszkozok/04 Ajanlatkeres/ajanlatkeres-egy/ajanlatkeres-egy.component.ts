import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {deepCopy} from '../../../common/deepCopy';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {AjanlatkeresSzerkesztesComponent} from '../ajanlatkeres-szerkesztes/ajanlatkeres-szerkesztes.component';
import {propCopy} from '../../../common/propCopy';
import {EgyszeruKerdesUzenetComponent} from '../../../common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ajanlatkeres-egy',
  templateUrl: './ajanlatkeres-egy.component.html'
})
export class AjanlatkeresEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_ajanlatkeres', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new AjanlatkeresDto();
  @Input() set dto(value: AjanlatkeresDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<AjanlatkeresDto> = new EventEmitter<AjanlatkeresDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<AjanlatkeresDto> = new EventEmitter<AjanlatkeresDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  ajanlatkeresservice: AjanlatkeresService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              ajanlatkeresservice: AjanlatkeresService) {
    super();

    this.ajanlatkeresservice = ajanlatkeresservice;
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
        const ujC = this.vcr.createComponent(AjanlatkeresSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.ajanlatkeresservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.ajanlatkeresservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.ajanlatkeresservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(AjanlatkeresSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.ZarasNyitas: // 50
        const ekuC = this.vcr.createComponent(EgyszeruKerdesUzenetComponent);

        ekuC.instance.cim = this.Dto.Nyitott ? 'Ajánlatkérés zárása' : 'Ajánlatkérés újranyitása';
        ekuC.instance.kerdes = this.Dto.Nyitott ? 'Biztosan zárja ezt az ajánlatkérést?' : 'Biztosan újranyitja ezt az ajánlatkérést?';
        ekuC.instance.uzenet = 'Kis türelmet...';
        ekuC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doZarasnyitas(ekuC, 'Az ajánlatkérés újra megnyitva!', 'Az ajánlatkérés lezárva!');
        });
        ekuC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
    }
  }

  doUjkesz(dto: AjanlatkeresDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.ajanlatkeresservice.Delete(this.Dto);
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

  doModositaskesz(dto: AjanlatkeresDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  async doZarasnyitas(ekuC: any, msgNyitott: string, msgZart: string) {
    const DtoEdited = deepCopy(this.Dto);

    this.spinner = true;
    try {
      const res = await this.ajanlatkeresservice.ZarasNyitas(DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.ajanlatkeresservice.Get(DtoEdited.Ajanlatkereskod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.Dto = res1.Result[0];

      if (this.Dto.Nyitott) {
        ekuC.instance.uzenet = msgNyitott;
      } else {
        ekuC.instance.uzenet = msgZart;
      }

      this.eventModositas.emit(res1.Result[0]);

      this.spinner = false;
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
