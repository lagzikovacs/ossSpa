import {Component, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {TeendoService} from '../../../services/torzs/primitiv/teendo.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teendo',
  templateUrl: './teendo.component.html',
  styleUrls: ['./teendo.component.css']
})
export class TeendoComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Teendő'];

  eppFrissit = false;
  teendoservice: TeendoService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              teendoservice: TeendoService) {
    this.teendoservice = teendoservice;
  }

  onKereses() {
    this.teendoservice.elsokereses = true;
    this.teendoservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.teendoservice.Read(this.teendoservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.teendoservice.elsokereses) {
          this.teendoservice.Dto = res.Result;
          this.teendoservice.elsokereses = false;
        } else {
          const buf = [...this.teendoservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.teendoservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }

  setClickedRow(i: number) {
    this.teendoservice.DtoSelectedIndex = i;
    this.teendoservice.uj = false;
    this._router.navigate(['../teendoegy'], {relativeTo: this._route});
  }

  uj() {
    this.eppFrissit = true;
    this.teendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.teendoservice.uj = true;
        this.teendoservice.DtoEdited = res.Result[0];
        this.teendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../teendouj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
