import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {HelysegDto} from '../helysegdto';
import {deepCopy} from '../../../common/deepCopy';
import {propCopy} from '../../../common/propCopy';
import {EgyszeruKeresesParam} from '../../../common/dtos/egyszerukeresesparam';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-helyseg-list',
  templateUrl: './helyseg-list.component.html'
})
export class HelysegListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;
  @ViewChild('compcont_helyseg', {read: ViewContainerRef}) vcr: ViewContainerRef;

  szurok = ['Helységnév'];
  ekDto = new EgyszeruKeresesParam(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  uj = false;
  zoom = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Dto = new Array<HelysegDto>();
  DtoSelectedIndex = -1;

  @Input() set maszk(value: string) {
    if (value !== undefined) {
      this.ekDto.minta = value || '';
      this.zoom = true;
    }
  }
  @Output() eventSelectzoom = new EventEmitter<HelysegDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  helysegservice: HelysegService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              helysegservice: HelysegService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  ngOnInit() {
    if (this.zoom) {
      this.onKereses();
    }
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();
    this.Dto = [];

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.helysegservice.Read(this.ekDto.minta);
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

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: HelysegDto) {
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

  onModositaskesz(dto: HelysegDto) {
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