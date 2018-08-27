import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujbizonylat',
  templateUrl: './projekt-bizonylatesirat-ujbizonylat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujbizonylat.component.css']
})
export class ProjektBizonylatesiratUjbizonylatComponent implements OnInit {

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
