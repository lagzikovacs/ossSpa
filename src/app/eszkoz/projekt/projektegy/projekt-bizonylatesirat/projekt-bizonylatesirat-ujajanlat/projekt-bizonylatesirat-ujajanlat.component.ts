import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat',
  templateUrl: './projekt-bizonylatesirat-ujajanlat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat.component.css']
})
export class ProjektBizonylatesiratUjajanlatComponent implements OnInit {

  constructor(private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    this.navigal();
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this._router.navigate(['../bizonylatesirat'], {relativeTo: this._route});
  }
}
