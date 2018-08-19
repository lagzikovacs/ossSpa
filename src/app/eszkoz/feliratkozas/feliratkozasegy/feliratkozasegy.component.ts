import {Component, ViewChild} from '@angular/core';
import {FeliratkozasService} from '../../../services/eszkoz/feliratkozas.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feliratkozasegy',
  templateUrl: './feliratkozasegy.component.html',
  styleUrls: ['./feliratkozasegy.component.css']
})
export class FeliratkozasegyComponent {
  feliratkozasservice: FeliratkozasService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              feliratkozasservice: FeliratkozasService) {
    this.feliratkozasservice = feliratkozasservice;
  }

  vissza() {
    this._router.navigate(['../feliratkozas'], {relativeTo: this._route});
  }
  reszletek() {
    this._router.navigate(['reszletek'], {relativeTo: this._route});
  }
  projekt() {
    this._router.navigate(['projekt'], {relativeTo: this._route});
  }
}
