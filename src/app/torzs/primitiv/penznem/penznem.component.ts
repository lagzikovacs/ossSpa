import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../../../services/torzs/primitiv/penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-penznem',
  templateUrl: './penznem.component.html',
  styleUrls: ['./penznem.component.css']
})
export class PenznemComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Pénznem'];

  eppFrissit = false;
  penznemservice: PenznemService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  onKereses() {
    this.penznemservice.elsokereses = true;
    this.penznemservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.penznemservice.Read(this.penznemservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.penznemservice.elsokereses) {
          this.penznemservice.Dto = res.Result;
          this.penznemservice.elsokereses = false;
        } else {
          const buf = [...this.penznemservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.penznemservice.Dto = buf;
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
    this.penznemservice.DtoSelectedIndex = i;
    this.penznemservice.uj = false;
    this._router.navigate(['../penznemegy'], {relativeTo: this._route});
  }

  uj() {
    this.eppFrissit = true;
    this.penznemservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.penznemservice.uj = true;
        this.penznemservice.DtoEdited = res.Result[0];
        this.penznemservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this._router.navigate(['../penznemuj'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
