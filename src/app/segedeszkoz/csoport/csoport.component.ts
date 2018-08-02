import {Component, ViewChild} from '@angular/core';
import {CsoportService} from '../../services/csoport.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-csoport',
  templateUrl: './csoport.component.html',
  styleUrls: ['./csoport.component.css']
})
export class CsoportComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Csoport'];

  eppFrissit = false;
  csoportservice: CsoportService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              csoportservice: CsoportService) {
    this.csoportservice = csoportservice;
  }

  onKereses() {
    this.csoportservice.elsokereses = true;
    this.csoportservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.csoportservice.Read(this.csoportservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.csoportservice.elsokereses) {
          this.csoportservice.Dto = res.Result;
          this.csoportservice.elsokereses = false;
        } else {
          const buf = [...this.csoportservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.csoportservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {

  }

  setClickedRow(i: number) {
    this.csoportservice.DtoSelectedIndex = i;
    this.csoportservice.uj = false;

    this.eppFrissit = true;
    this.csoportservice.SelectCsoportFelhasznalo(this.csoportservice.Dto[i].CSOPORTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.csoportservice.DtoCsoportFelhasznalo = res.Result;

        return this.csoportservice.SelectCsoportJog(this.csoportservice.Dto[i].CSOPORTKOD);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.csoportservice.DtoCsoportLehetsegesJog = res1.Result;

        this.eppFrissit = false;
        this._router.navigate(['../csoportegy'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  uj() {
    this.eppFrissit = true;
    this.csoportservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.csoportservice.uj = true;
        this.csoportservice.DtoEdited = res.Result[0];
        this.csoportservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../csoportuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
