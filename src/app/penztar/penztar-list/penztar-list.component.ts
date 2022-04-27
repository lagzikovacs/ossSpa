import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../../02 Eszkozok/03 Penztar/penztar/penztar.service';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../common/enums/jogkod';
import {ErrorService} from '../../common/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../common/dtos/egyszerukeresesdto';
import {PenztarDto} from '../../02 Eszkozok/03 Penztar/penztar/penztardto';
import {EgyMode} from '../../common/enums/egymode';
import {propCopy} from '../../common/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-penztar-list',
  templateUrl: './penztar-list.component.html',
  animations: [rowanimation]
})
export class PenztarListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Pénztár'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  jog = false;
  nyitva = false;
  elsokereses = true;
  eppFrissit = false;

  Dto = new Array<PenztarDto>();
  DtoSelectedIndex = -1;

  egymode = 13;

  penztarservice: PenztarService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
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
          this.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    if (i !== this.DtoSelectedIndex) {
      this.egymode = 13;
    } else {
      this.egymode = 0;
    }

    this.DtoSelectedIndex = i;

    this.nyitva = this.DtoSelectedIndex === -1 ? false : this.Dto[this.DtoSelectedIndex].Nyitva;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: PenztarDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onModositaskesz(dto: PenztarDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.penztarservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = 0;
    }
  }

  onReread() {
    this.eppFrissit = true;
    this.penztarservice.ReadById(this.Dto[this.DtoSelectedIndex].Penztarkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        propCopy(res.Result[0], this.Dto[this.DtoSelectedIndex]);
        this.eppFrissit = false;
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
