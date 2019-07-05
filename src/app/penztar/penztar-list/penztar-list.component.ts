import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {PenztartetelDto} from '../../penztartetel/penztarteteldto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../dtos/egyszerukeresesdto';

@Component({
  selector: 'app-penztar-list',
  templateUrl: './penztar-list.component.html'
})
export class PenztarListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Pénztár'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  jog = false;
  elsokereses = true;


  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  penztarservice: PenztarService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _penztartetelservice: PenztartetelService,
              penztarservice: PenztarService) {
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PENZTARMOD]);
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penztarservice.Read(this.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.penztarservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.penztarservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penztarservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.penztarservice.DtoSelectedIndex = i;

    this._penztartetelservice.Dto = new Array<PenztartetelDto>();
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
