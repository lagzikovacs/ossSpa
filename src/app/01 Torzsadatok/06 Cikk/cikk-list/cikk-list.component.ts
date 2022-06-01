import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Szempont} from '../../../common/enums/szempont';
import {CikkDto} from '../cikkdto';
import {SzMT} from '../../../common/dtos/szmt';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {CikkParameter} from '../cikkparameter';
import {deepCopy} from '../../../common/deepCopy';
import {propCopy} from '../../../common/propCopy';
import {CikkService} from '../cikk.service';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CikkSzerkesztesComponent} from "../cikk-szerkesztes/cikk-szerkesztes.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-list',
  templateUrl: './cikk-list.component.html'
})
export class CikkListComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;
  @ViewChild('compcont_cikkuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  szurok = ['Megnevezés', 'Id'];
  szempont = 0;
  minta = '';
  up = new CikkParameter(0, environment.lapmeret);
  szempontok = [
    Szempont.Megnevezes, Szempont.Kod
  ];
  elsokereses = true;
  osszesrekord = 0;
  jog = false;
  zoom = false;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  Dto = new Array<CikkDto>();
  DtoSelectedIndex = -1;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.minta = value || '';
      this.szempont = 0;
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<CikkDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  cikkservice: CikkService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              cikkservice: CikkService  ) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
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

    this.Dto = new Array<CikkDto>();
    this.DtoSelectedIndex = -1;
    this.osszesrekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.fi = new Array<SzMT>();
    this.up.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.cikkservice.Select(this.up);
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
      this.osszesrekord = res.OsszesRekord;

      this.up.rekordtol += this.up.lapmeret;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doUjtetel() {
    this.vcruj.clear();
    this.tabla.clearselections();
    const ujC = this.vcruj.createComponent(CikkSzerkesztesComponent);

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

  onModositaskesz(dto: CikkDto) {
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
