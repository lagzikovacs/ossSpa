import {
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cikk-list',
  templateUrl: './cikk-list.component.html'
})
export class CikkListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

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
  uj = false;
  zoom = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
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
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
  }

  ngOnInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.Dto = new Array<CikkDto>();
    this.DtoSelectedIndex = -1;
    this.osszesrekord = 0;

    this.elsokereses = true;
    this.up.rekordtol = 0;
    this.up.fi = new Array<SzMT>();
    this.up.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.tabla.clearselections();

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

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: CikkDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
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

  ngOnDestroy(): void {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
