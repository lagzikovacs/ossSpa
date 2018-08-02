import {Component, ViewChild} from '@angular/core';
import {IratService} from '../../services/irat.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {IratDto} from '../../dtos/irat/iratdto';

@Component({
  selector: 'app-irat',
  templateUrl: './irat.component.html',
  styleUrls: ['./irat.component.css']
})
export class IratComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Id', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];
  szurok2 = ['-', 'Keletkezett', 'Ügyfél', 'Tárgy', 'Irattipus', 'Küldő'];

  szempontok = [
    Szempont.Kod, Szempont.Keletkezett,
    Szempont.Ugyfel, Szempont.Targy, Szempont.Irattipus,
    Szempont.Kuldo
  ];

  eppFrissit = false;
  iratservice: IratService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              iratservice: IratService) {
    this.iratservice = iratservice;
  }

  onKereses() {
    this.iratservice.Dto = new Array<IratDto>();
    this.iratservice.DtoSelectedIndex = -1;
    this.iratservice.OsszesRekord = 0;

    this.iratservice.elsokereses = true;
    this.iratservice.ip.rekordtol = 0;
    this.iratservice.ip.fi = new Array<SzMT>();

    if (this.iratservice.szempont === this.iratservice.szempont2 && this.iratservice.szempont !== 0) {
      this.errormodal.show('Ne válasszon azonos szempontokat!');
      return;
    }

    this.iratservice.ip.fi.push(new SzMT(this.szempontok[this.iratservice.szempont], this.iratservice.minta));
    if (this.iratservice.szempont2 > 0) {
      this.iratservice.ip.fi.push(new SzMT(this.szempontok[this.iratservice.szempont2], this.iratservice.minta2));
    }

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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  setClickedRow(i: number) {
    this.iratservice.DtoSelectedIndex = i;
    this.iratservice.uj = false;
    this._router.navigate(['../irategy'], {relativeTo: this._route});
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

        this._router.navigate(['../iratuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
