import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {UgyfelService} from '../../../ugyfel/ugyfel.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {UgyfelSzerkesztesMode} from '../../../ugyfel/ugyfelszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {HelysegDto} from '../helysegdto';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-helyseg-list',
  templateUrl: './helyseg-list.component.html'
})
export class HelysegListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Helységnév'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;
  zoom = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

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
              private _spinnerservice: SpinnerService,
              helysegservice: HelysegService,
              private ugyfelservice: UgyfelService) {
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

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.helysegservice.Read(this.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.helysegservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.helysegservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.helysegservice.Dto = buf;
        }

        this.eppFrissit = false;

        // if (this.helysegservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.helysegservice.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  onId(i: number) {
    this.helysegservice.DtoSelectedIndex = i;
  }

  onUj() {
    this.tabla.ujtetelstart();
  }

  onUjkesz() {
    this.tabla.ujtetelstop();
  }

  onTorlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
