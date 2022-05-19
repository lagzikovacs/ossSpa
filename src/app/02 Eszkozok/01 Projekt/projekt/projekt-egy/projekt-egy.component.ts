import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ProjektService} from '../projekt.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {ProjektDto} from '../projektdto';
import {deepCopy} from '../../../../common/deepCopy';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {EgyMode} from '../../../../common/enums/egymode';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../../common/propCopy';
import {ProjektkapcsolatListComponent} from '../../projektkapcsolat/projektkapcsolat-list/projektkapcsolat-list.component';
import {ProjektSzerkesztesComponent} from '../projekt-szerkesztes/projekt-szerkesztes.component';
import {HibabejelentesListComponent} from '../../../06 Hibabejelentes/hibabejelentes-list/hibabejelentes-list.component';
import {FelmeresListComponent} from '../../../05 Felmeres/felmeres-list/felmeres-list.component';
import {ProjektJegyzetListComponent} from '../../projektjegyzet/projekt-jegyzet-list/projekt-jegyzet-list.component';
import {ProjektStatuszComponent} from '../projekt-statusz/projekt-statusz.component';
import {ProjektMuszakiallapotComponent} from '../projekt-muszakiallapot/projekt-muszakiallapot.component';
import {ProjektIratmintaComponent} from '../projekt-iratminta/projekt-iratminta.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-egy',
  templateUrl: './projekt-egy.component.html'
})
export class ProjektEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_projekt', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 24;

  Dto = new ProjektDto();
  @Input() set dto(value: ProjektDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<ProjektDto> = new EventEmitter<ProjektDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<ProjektDto> = new EventEmitter<ProjektDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  jog = false;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
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
        const ujC = this.vcr.createComponent(ProjektSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.projektservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.projektservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.projektservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(ProjektSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
      case EgyMode.Statusz: // 19
        const projektstatuszC = this.vcr.createComponent(ProjektStatuszComponent);

        projektstatuszC.instance.DtoOriginal = this.Dto;
        projektstatuszC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doSegedOk(dto);
        });
        projektstatuszC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doSegedCancel();
        });
        break;
      case EgyMode.Muszakiallapot: // 20
        const projektmuszakiallapotC = this.vcr.createComponent(ProjektMuszakiallapotComponent);

        projektmuszakiallapotC.instance.DtoOriginal = this.Dto;
        projektmuszakiallapotC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doSegedOk(dto);
        });
        projektmuszakiallapotC.instance.eventCancel.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doSegedCancel();
        });
        break;
      case EgyMode.Iratminta: // 23
        const projektiratmintaC = this.vcr.createComponent(ProjektIratmintaComponent);

        projektiratmintaC.instance.Projektkod = this.Dto.Projektkod;
        projektiratmintaC.instance.eventMunkalaputan.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doMunkalaputan();
        });
        break;
      case EgyMode.Bizonylatesirat: // 24
        const projektkapcsolatlistC = this.vcr.createComponent(ProjektkapcsolatListComponent);

        projektkapcsolatlistC.instance.Projektkod = this.Dto.Projektkod;
        projektkapcsolatlistC.instance.Ugyfelkod = this.Dto.Ugyfelkod;
        break;
      case EgyMode.Jegyzet: // 26
        const projektjegyzetC = this.vcr.createComponent(ProjektJegyzetListComponent);

        projektjegyzetC.instance.Projektkod = this.Dto.Projektkod;
        break;
      case EgyMode.FelmeresProjekthez: // 43
        const felmereslistC = this.vcr.createComponent(FelmeresListComponent);

        felmereslistC.instance.ProjektBol = true;
        felmereslistC.instance.ProjektDto = this.Dto;
        felmereslistC.instance.statusz = 0;
        break;
      case EgyMode.HibabejelentesProjekthez: // 44
        const hibabejelenteslistC = this.vcr.createComponent(HibabejelentesListComponent);

        hibabejelenteslistC.instance.ProjektBol = true;
        hibabejelenteslistC.instance.ProjektDto = this.Dto;
        break;
    }
  }

  doUjkesz(dto: ProjektDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res =  await this.projektservice.Delete(this.Dto);
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

  doModositaskesz(dto: ProjektDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  async doMunkalaputan() {
    this.spinner = true;
    try {
      const res = await this.projektservice.Get(this.Dto.Projektkod);
      if (res.Error !== null) {
        throw res.Error;
      }

      propCopy(res.Result[0], this.Dto);

      this.spinner = false;
      this.eventModositas.emit(this.Dto);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async doSegedOk(dto: ProjektDto) {
    this.spinner = true;
    try {
      const res = await this.projektservice.Update(dto);
      if (res.Error !== null) {
        throw res.Error;
      }

      const res1 = await this.projektservice.Get(res.Result);
      if (res1.Error !== null) {
        throw res1.Error;
      }

      propCopy(res1.Result[0], this.Dto);

      this.spinner = false;
      this.doNav(0);

      this.eventModositas.emit(this.Dto);

    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doSegedCancel() {
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
