import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {MeService} from '../me.service';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {MeDto} from '../medto';
import {deepCopy} from '../../../common/deepCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {propCopy} from '../../../common/propCopy';
import {EgyszeruKeresesParam} from '../../../common/dtos/egyszerukeresesparam';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {MeSzerkesztesComponent} from "../me-szerkesztes/me-szerkesztes.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-me-list',
  templateUrl: './me-list.component.html'
})
export class MeListComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;
  @ViewChild('compcont_meuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  szurok = ['Mennyiségi egység'];
  ekDto = new EgyszeruKeresesParam(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  Dto = new Array<MeDto>();
  DtoSelectedIndex = -1;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.ekDto.minta = value || '';
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<MeDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  meservice: MeService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              meservice: MeService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.meservice = meservice;
  }

  ngAfterViewInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  onKereses() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.meservice.Read(this.ekDto.minta);
      if (res.Error != null) {
        throw res.Error;
      }

      if (this.elsokereses) {
        this.Dto = res.Result;
        this.elsokereses = false;
      } else {
        const buf = [...this.Dto];
        res.Result.forEach(element => {
          buf.push(element);
        });
        this.Dto = buf;
      }

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doUjtetel() {
    this.vcruj.clear();
    this.tabla.clearselections();
    const ujC = this.vcruj.createComponent(MeSzerkesztesComponent);

    ujC.instance.uj = true;
    ujC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();

      const buf = [...this.Dto];
      buf.unshift(dto);
      this.Dto = buf;

      this.docdr();
    });
    ujC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcruj.clear();
    });
  }

  onId(i: number) {
    this.vcruj.clear();
    this.DtoSelectedIndex = i;
    this.tabla.egytetelstart();
  }

  onTorles() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositaskesz(dto: MeDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.Dto[i]));
    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;
    this.eventStopzoom.emit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
