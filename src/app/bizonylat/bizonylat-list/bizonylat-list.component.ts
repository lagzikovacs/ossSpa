import {Component, OnDestroy} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatkapcsolatService} from '../../bizonylatkapcsolat/bizonylatkapcsolat.service';
import {KifizetesService} from '../../kifizetes/kifizetes.service';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {BizonylatTipus} from '../bizonylattipus';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html'
})
export class BizonylatListComponent implements OnDestroy {
  megrendelesszurok = ['Mind', 'Nincs kiszállítva'];
  szurok = ['Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.Bizonylatszam, Szempont.Ugyfel,
  ];

  bizonylatservice: BizonylatService;
  mod = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _bizonylatkifizetesservice: KifizetesService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatservice: BizonylatService) {
    this.mod = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.bizonylatservice = bizonylatservice;
  }

  onKereses() {
    this.bizonylatservice.elsokereses = true;
    this.bizonylatservice.bp.rekordtol = 0;
    this.bizonylatservice.bp.fi = new Array();
    this.bizonylatservice.bp.BizonylatTipus = this.bizonylatservice.bizonylatTipus;
    this.bizonylatservice.bp.fi.push(new SzMT(this.szempontok[this.bizonylatservice.szempont], this.bizonylatservice.minta));

    // TODO szempont és megrendelesszempont tipusa valamiért stringre vált
    if (this.bizonylatservice.bizonylatTipus === BizonylatTipus.Megrendeles && this.bizonylatservice.megrendelesszempont == 1) {
      this.bizonylatservice.bp.fi.push(new SzMT(Szempont.NincsKiszallitva, ''));
    }

    this.onKeresesTovabb();
  }
  onKeresesTovabb() {
    this.eppFrissit = true;
    this.bizonylatservice.Select(this.bizonylatservice.bp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.bizonylatservice.elsokereses) {
          this.bizonylatservice.Dto = res.Result;
          this.bizonylatservice.elsokereses = false;
        } else {
          const buf = [...this.bizonylatservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.bizonylatservice.Dto = buf;
        }
        this.bizonylatservice.OsszesRekord = res.OsszesRekord;

        this.bizonylatservice.bp.rekordtol += this.bizonylatservice.bp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i: number) {
    this.bizonylatservice.DtoSelectedIndex = i;

    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res.Result[0].Dto;
        this.bizonylatservice.TetelDto = res.Result[0].LstTetelDto;
        this.bizonylatservice.AfaDto = res.Result[0].LstAfaDto;
        this.bizonylatservice.TermekdijDto = res.Result[0].LstTermekdijDto;

        this.bizonylatservice.ContainerMode = BizonylatContainerMode.Egy;
        this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onUj() {
    this.eppFrissit = true;
    this.bizonylatservice.CreateNewComplex()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.bizonylatservice.ComplexDtoEdited = res.Result[0];
        this.bizonylatservice.ComplexDtoEdited.Dto.Bizonylattipuskod = this.bizonylatservice.bizonylatTipus;

        this.bizonylatservice.uj = true;
        this.eppFrissit = false;
        this.bizonylatservice.ContainerMode = BizonylatContainerMode.Uj;
        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
