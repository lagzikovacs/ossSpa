import {Component, ViewChild} from '@angular/core';
import {PenztartetelService} from '../../../../../services/eszkoz/penztartetel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-penztartetel-szerkesztes',
  templateUrl: './penztartetel-szerkesztes.component.html',
  styleUrls: ['./penztartetel-szerkesztes.component.css']
})
export class PenztartetelSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztartetelservice: PenztartetelService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
  }

  onSubmit() {}
  cancel() {
    this._router.navigate(['../tetelek'], {relativeTo: this._route});
  }
}
