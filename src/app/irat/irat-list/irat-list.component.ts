import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {IratService} from '../irat.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {IratDto} from '../iratdto';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {DokumentumContainerMode} from '../../dokumentum/dokumentumcontainermode';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-irat-list',
  templateUrl: './irat-list.component.html'
})
export class IratListComponent implements OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  szurok = ['Id', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];
  szurok2 = ['-', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];

  szempontok = [
    Szempont.Kod, Szempont.Keletkezett,
    Szempont.Ugyfel, Szempont.Targy, Szempont.Irattipus,
    Szempont.Kuldo
  ];

  iratservice: IratService;
  dokumentumservice: DokumentumService;
  mod = false;

  @Input() enProjekt = true;

  @Output() KontenerKeres = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.iratservice = iratservice;
    this.dokumentumservice = dokumentumservice;
  }

  onKereses() {
    this.iratservice.Dto = new Array<IratDto>();
    this.iratservice.DtoSelectedIndex = -1;
    this.iratservice.OsszesRekord = 0;

    this.iratservice.elsokereses = true;
    this.iratservice.ip.rekordtol = 0;
    this.iratservice.ip.fi = new Array<SzMT>();

    if (this.iratservice.szempont === this.iratservice.szempont2 && this.iratservice.szempont !== 0) {
      this._errorservice.Error = 'Ne válasszon azonos szempontokat!';
      return;
    }

    this.iratservice.ip.fi.push(new SzMT(this.szempontok[this.iratservice.szempont], this.iratservice.minta));
    if (this.iratservice.szempont2 > 0) {
      this.iratservice.ip.fi.push(new SzMT(this.szempontok[this.iratservice.szempont2], this.iratservice.minta2));
    }

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.iratservice.Select(this.iratservice.ip)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.iratservice.elsokereses) {
          this.iratservice.Dto = res.Result;
          this.iratservice.elsokereses = false;
        } else {
          const buf = [...this.iratservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.iratservice.Dto = buf;
        }
        this.iratservice.OsszesRekord = res.OsszesRekord;

        this.iratservice.ip.rekordtol += this.iratservice.ip.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  setClickedRow(i: number) {
    this.iratservice.DtoSelectedIndex = i;
    this.iratservice.uj = false;

    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }

  onUj() {
    this.eppFrissit = true;
    this.iratservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.iratservice.uj = true;
        this.iratservice.DtoEdited = res.Result[0];
        this.iratservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.KontenerKeres.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
