import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {EgyMode} from '../../../common/enums/egymode';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {deepCopy} from '../../../common/deepCopy';
import {ProjektDto} from '../../01 Projekt/projekt/projektdto';
import {HibabejelentesService} from '../hibabejelentes.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {ProjektTelepitesiDokumentumokKivalasztasaComponent} from '../projekt-telepitesi-dokumentumok-kivalasztasa/projekt-telepitesi-dokumentumok-kivalasztasa.component';
import {DokumentumListComponent} from '../../02 Irat/dokumentum/dokumentum-list/dokumentum-list.component';
import {ProjektEmailalapjanComponent} from '../../01 Projekt/projekt/projekt-emailalapjan/projekt-emailalapjan.component';
import {HibabejelentesSzerkesztesComponent} from '../hibabejelentes-szerkesztes/hibabejelentes-szerkesztes.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../common/propCopy';
import {HibabejelentesJelentesComponent} from '../hibabejelentes-jelentes/hibabejelentes-jelentes.component';
import {TelepitesiDokumentumokKivalasztasaComponent} from '../telepitesi-dokumentumok-kivalasztasa/telepitesi-dokumentumok-kivalasztasa.component';
import {EgyszeruKerdesUzenetComponent} from '../../../common/egyszeru-kerdes-uzenet/egyszeru-kerdes-uzenet.component';
import {ProjekthezRendelesComponent} from '../../01 Projekt/projekt/projekthez-rendeles/projekthez-rendeles.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hibabejelentes-egy',
  templateUrl: './hibabejelentes-egy.component.html'
})
export class HibabejelentesEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_hibabejelentes', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new HibabejelentesDto();
  @Input() set dto(value: HibabejelentesDto) {
    this.Dto = deepCopy(value);
  }
  @Input() dokcim = '';
  @Input() ProjektBol = false;
  @Input() ProjektDto: ProjektDto = new ProjektDto();
  @Output() eventUj: EventEmitter<HibabejelentesDto> = new EventEmitter<HibabejelentesDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<HibabejelentesDto> = new EventEmitter<HibabejelentesDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  hibabejelentesservice: HibabejelentesService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              hibabejelentesservice: HibabejelentesService) {
    super();

    this.hibabejelentesservice = hibabejelentesservice;
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
        const ujC = this.vcr.createComponent(HibabejelentesSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.ProjektBol = this.ProjektBol;
        ujC.instance.ProjektDto = this.ProjektDto;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.hibabejelentesservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.hibabejelentesservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.hibabejelentesservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(HibabejelentesSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.ProjektBol = this.ProjektBol;
        C.instance.ProjektDto = this.ProjektDto;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Projekt: // 8
        const peC = this.vcr.createComponent(ProjektEmailalapjanComponent);

        peC.instance.Email = this.Dto.Email;
        break;
      case EgyMode.Dokumentum: // 15
        const dC = this.vcr.createComponent(DokumentumListComponent);

        dC.instance.Iratkod = this.Dto.Iratkod;
        dC.instance.cim = 'A jelentés dokumentumai';
        dC.instance.mod = !this.ProjektBol && this.Dto.Nyitott;
        break;
      case EgyMode.FelmeresJelentes: // 46
        const hjC = this.vcr.createComponent(HibabejelentesJelentesComponent);

        hjC.instance.DtoOriginal = this.Dto;
        hjC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.TelepitesiDokumentumokKivalasztasa: // 47
        const tdkC = this.vcr.createComponent(TelepitesiDokumentumokKivalasztasaComponent);

        tdkC.instance.Projektkod = this.ProjektDto.Projektkod;
        tdkC.instance.DtoOriginal = this.Dto;
        tdkC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.ProjektEsTelepitesiDokumentumokKivalasztasa: // 48
        const ptdC = this.vcr.createComponent(ProjektTelepitesiDokumentumokKivalasztasaComponent);
        break;
      case EgyMode.TelepitesiDokumentumok: // 49
        const tpdC = this.vcr.createComponent(DokumentumListComponent);

        tpdC.instance.Iratkod = this.Dto.Iratkod1;
        tpdC.instance.cim = 'A telepítés dokumentumai';
        tpdC.instance.mod = false;
        break;
      case EgyMode.ZarasNyitas: // 50
        const ekuC = this.vcr.createComponent(EgyszeruKerdesUzenetComponent);

        ekuC.instance.cim = this.Dto.Nyitott ? 'Hibabejelentés zárása' : 'Hibabejelentés újranyitása';
        ekuC.instance.kerdes = this.Dto.Nyitott ? 'Biztosan zárja ezt a hibabejelentést?' : 'Biztosan újranyitja ezt a hibabejelentést?';
        ekuC.instance.uzenet = 'Kis türelmet...';
        ekuC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doZarasnyitas(ekuC, 'A hibabejelentés újra megnyitva!', 'A hibabejelentés lezárva!');
        });
        ekuC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
      case EgyMode.ProjekthezRendeles: // 51
        const hpC = this.vcr.createComponent(ProjekthezRendelesComponent);

        hpC.instance.Szerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(pk => {
          this.doProjekthezRendeles(pk);
        });
      break;
    }
  }

  doUjkesz(dto: HibabejelentesDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.hibabejelentesservice.Delete(this.Dto);
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

  async doProjekthezRendeles(projektkod: number) {
    if (projektkod !== null) {
      const DtoEdited = deepCopy(this.Dto);
      DtoEdited.Projektkod = projektkod;

      this.spinner = true;
      try {
        const res = await this.hibabejelentesservice.Update(DtoEdited);
        if (res.Error != null) {
          throw res.Error;
        }

        const res1 = await this.hibabejelentesservice.Get(DtoEdited.Hibabejelenteskod);
        if (res1.Error != null) {
          throw res1.Error;
        }

        propCopy(res1.Result[0], this.Dto);

        this.spinner = false;
        this.doNav(0);
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
      const res = await this.hibabejelentesservice.ZarasNyitas(DtoEdited);
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.hibabejelentesservice.Get(DtoEdited.Ajanlatkereskod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      propCopy(res1.Result[0], this.Dto);

      if (this.Dto.Nyitott) {
        ekuC.instance.uzenet = msgNyitott;
      } else {
        ekuC.instance.uzenet = msgZart;
      }

      this.spinner = false;

      this.eventModositas.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doModositaskesz(dto: HibabejelentesDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }
}
