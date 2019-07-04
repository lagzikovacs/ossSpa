import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {ZoomSources} from '../../../enums/zoomsources';
import {ProjektkapcsolatService} from '../../../projektkapcsolat/projektkapcsolat.service';
import {IratService} from '../../../irat/irat.service';
import {IratSzerkesztesMode} from '../../../irat/iratszerkesztesmode';
import {BizonylatesiratSzerkesztesMode} from '../../../projektkapcsolat/bizonylatesiratszerkesztesmode';
import {BizonylatkapcsolatService} from '../../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {BizonylatKapcsolatSzerkesztesMode} from '../../../bizonylatkapcsolat/bizonylatkapcsolatszerkesztesmode';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {SpinnerService} from '../../../tools/spinner/spinner.service';
import {TablaComponent} from '../../../tools/tabla/tabla.component';
import {environment} from '../../../../environments/environment';
import {EgyszeruKeresesDto} from '../../../dtos/egyszerukeresesdto';
import {IrattipusDto} from '../irattipusdto';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-irattipus-list',
  templateUrl: './irattipus-list.component.html'
})
export class IrattipusListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Irattipus'];
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
  @Output() eventSelectzoom = new EventEmitter<IrattipusDto>();
  @Output() eventStopzoom = new EventEmitter<void>();

  irattipusservice: IrattipusService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              irattipusservice: IrattipusService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
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
    this.irattipusservice.Read(this.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.irattipusservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.irattipusservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.irattipusservice.Dto = buf;
        }

        this.eppFrissit = false;

        // if (this.irattipusservice.zoom) {
        //   window.scrollTo(0, document.body.scrollHeight);
        // }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(deepCopy(this.irattipusservice.Dto[i]));

    this.onStopzoom();
  }
  onStopzoom() {
    this.zoom = false;

    this.eventStopzoom.emit();
  }

  onId(i: number) {
    this.irattipusservice.DtoSelectedIndex = i;
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
