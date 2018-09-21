import {Component, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatkapcsolatService} from '../bizonylatirat/bizonylatkapcsolat.service';
import {BizonylatkifizetesService} from '../bizonylatkifizetes/bizonylatkifizetes.service';
import {BizonylatEgyMode} from '../bizonylategymode';

@Component({
  selector: 'app-bizonylat-list',
  templateUrl: './bizonylat-list.component.html',
  styleUrls: ['./bizonylat-list.component.css']
})
export class BizonylatListComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Bizonylatszám', 'Ügyfél'];
  szempontok = [
    Szempont.Kod, Szempont.Bizonylatszam, Szempont.Ugyfel,
  ];

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _bizonylatkifizetesservice: BizonylatkifizetesService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  onKereses() {
    this.bizonylatservice.elsokereses = true;
    this.bizonylatservice.bp.rekordtol = 0;
    this.bizonylatservice.bp.fi = new Array();
    this.bizonylatservice.bp.BizonylatTipus = this.bizonylatservice.bizonylatTipus;
    this.bizonylatservice.bp.fi.push(new SzMT(this.szempontok[this.bizonylatservice.szempont], this.bizonylatservice.minta));

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
        this.errormodal.show(err);
      });
  }

  setClickedRow(i: number) {
    this.bizonylatservice.DtoSelectedIndex = i;

    this.eppFrissit = true;
    this.bizonylatservice.GetComplex(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res.Result[0].Dto;
        this.bizonylatservice.TetelDto = res.Result[0].LstTetelDto;
        this.bizonylatservice.AfaDto = res.Result[0].LstAfaDto;
        this.bizonylatservice.TermekdijDto = res.Result[0].LstTermekdijDto;

        return this._bizonylatkapcsolatservice.Select(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATKOD);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this._bizonylatkapcsolatservice.Dto = res1.Result;
        return this._bizonylatkifizetesservice.Select(this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex].BIZONYLATKOD);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this._bizonylatkifizetesservice.Dto = res2.Result;

        this.bizonylatservice.ContainerMode = BizonylatContainerMode.Egy;
        this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  onUj() {
    this.eppFrissit = true;
    this.bizonylatservice.CreateNewComplex()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.bizonylatservice.uj = true;
        this.eppFrissit = false;
        this.bizonylatservice.ContainerMode = BizonylatContainerMode.Uj;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}
