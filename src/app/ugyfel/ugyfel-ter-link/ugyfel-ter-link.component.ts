import {Component, ViewChild} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-ugyfel-ter-link',
  templateUrl: './ugyfel-ter-link.component.html',
  styleUrls: ['./ugyfel-ter-link.component.css']
})
export class UgyfelTerLinkComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  link = '';
  eppFrissit = false;

  constructor(private _ugyfelservice: UgyfelService) { }

  ugyfelterlink() {
    this.eppFrissit = true;
    this._ugyfelservice.UgyfelterLink(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }
        console.log(res);
        this.link = res.Result;
        return this._ugyfelservice.Get(this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex].UGYFELKOD);
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        this._ugyfelservice.Dto[this._ugyfelservice.DtoSelectedIndex] = res1.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}
