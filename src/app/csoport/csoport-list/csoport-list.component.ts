import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../dtos/egyszerukeresesdto';
import {CsoportDto} from '../csoportdto';
import {EgyMode} from '../../enums/egymode';
import {rowanimation} from '../../animation/rowAnimation';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-csoport-list',
  templateUrl: './csoport-list.component.html',
  animations: [rowanimation]
})
export class CsoportListComponent implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  szurok = ['Csoport'];
  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;

  Dto = new Array<CsoportDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  eppFrissit = false;

  csoportservice: CsoportService;

  constructor(private _errorservice: ErrorService,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.csoportservice.Read(this.ekDto.minta)
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
    this.DtoSelectedIndex = i; // lehet -1
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: CsoportDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: CsoportDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = EgyMode.Reszletek;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.csoportservice.Delete(this.Dto[this.DtoSelectedIndex])
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
      this.egymode = EgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
