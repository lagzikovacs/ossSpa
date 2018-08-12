import {Component, ViewChild} from '@angular/core';
import {TermekdijService} from '../../../../services/torzs/primitiv/termekdij.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-termekdijegy',
  templateUrl: './termekdijegy.component.html',
  styleUrls: ['./termekdijegy.component.css']
})
export class TermekdijegyComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }

  vissza() {
    this._router.navigate(['../termekdij'], {relativeTo: this._route});
  }
  torles () {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = Object.assign({}, this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this._router.navigate(['szerkesztes'], {relativeTo: this._route});
  }
}
