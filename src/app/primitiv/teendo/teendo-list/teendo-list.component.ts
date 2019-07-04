import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {JogKod} from '../../../enums/jogkod';
import {LogonService} from '../../../logon/logon.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektteendoService} from '../../../projektteendo/projektteendo.service';
import {ProjektteendoSzerkesztesMode} from '../../../projektteendo/projektteendoszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {TeendoDto} from '../teendodto';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-teendo-list',
  templateUrl: './teendo-list.component.html'
})
export class TeendoListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Teendő'];
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
  @Output() eventSelectzoom = new EventEmitter<TeendoDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  teendoservice: TeendoService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _projektteendoservice: ProjektteendoService,
              teendoservice: TeendoService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
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
    this.teendoservice.Read(this.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.teendoservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.teendoservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.teendoservice.Dto = buf;
        }

        this.eppFrissit = false;

        // if (this.teendoservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.teendoservice.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  onId(i: number) {
    this.teendoservice.DtoSelectedIndex = i;
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
