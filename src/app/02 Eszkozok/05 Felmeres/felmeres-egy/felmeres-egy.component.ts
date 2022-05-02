import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../../common/deepCopy';
import {FelmeresService} from '../felmeres.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../common/propCopy';
import {FelmeresJelentesComponent} from '../felmeres-jelentes/felmeres-jelentes.component';
import {DokumentumListComponent} from '../../02 Irat/dokumentum/dokumentum-list/dokumentum-list.component';
import {FelmeresSzerkesztesComponent} from '../felmeres-szerkesztes/felmeres-szerkesztes.component';
import {ProjektDto} from '../../01 Projekt/projekt/projektdto';
import {EgyszeruKerdesUzenetComponent} from '../../../common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felmeres-egy',
  templateUrl: './felmeres-egy.component.html'
})
export class FelmeresEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_felmeres', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new FelmeresDto();
  @Input() set dto(value: FelmeresDto) {
    this.Dto = deepCopy(value);
  }
  @Input() dokcim = '';
  @Input() ProjektBol = false;
  @Input() ProjektDto: ProjektDto = new ProjektDto();
  @Output() eventUj: EventEmitter<FelmeresDto> = new EventEmitter<FelmeresDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<FelmeresDto> = new EventEmitter<FelmeresDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  felmeresservice: FelmeresService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              felmeresservice: FelmeresService) {
    super();

    this.felmeresservice = felmeresservice;
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
        const ujC = this.vcr.createComponent(FelmeresSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.ProjektBol = this.ProjektBol;
        ujC.instance.ProjektDto = this.ProjektDto;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.felmeresservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.felmeresservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.felmeresservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(FelmeresSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.ProjektBol = this.ProjektBol;
        C.instance.ProjektDto = this.ProjektDto;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Dokumentum: // 15
        const dokC = this.vcr.createComponent(DokumentumListComponent);

        dokC.instance.Iratkod = this.Dto.Iratkod;
        dokC.instance.cim = this.dokcim;
        dokC.instance.mod = !this.ProjektBol && this.Dto.Nyitott;
        break;
      case EgyMode.FelmeresJelentes: // 46
        const fjC = this.vcr.createComponent(FelmeresJelentesComponent);

        fjC.instance.DtoOriginal = this.Dto;
        fjC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.ZarasNyitas: // 50
        const ekuC = this.vcr.createComponent(EgyszeruKerdesUzenetComponent);

        ekuC.instance.cim = this.Dto.Nyitott ? 'Felmérés zárása' : 'Felmérés újranyitása';
        ekuC.instance.kerdes = this.Dto.Nyitott ? 'Biztosan zárja ezt a felmérést?' : 'Biztosan újranyitja ezt a felmérést?';
        ekuC.instance.uzenet = 'Kis türelmet...';
        ekuC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doZarasnyitas(ekuC, 'A felmérés újra megnyitva!', 'A felmérés lezárva!');
        });
        ekuC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
    }
  }

  doUjkesz(dto: FelmeresDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.felmeresservice.Delete(this.Dto);
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

  async doZarasnyitas(ekuC: any, msgNyitott: string, msgZart: string) {
    const DtoEdited = deepCopy(this.Dto);

    this.spinner = true;
    try {
      const res = await this.felmeresservice.ZarasNyitas(DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.felmeresservice.Get(DtoEdited.Ajanlatkereskod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      propCopy(res1.Result[0], this.Dto);

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

  doModositaskesz(dto: FelmeresDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }
}
