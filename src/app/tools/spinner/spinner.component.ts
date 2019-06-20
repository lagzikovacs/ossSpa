import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'app-gspinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class GspinnerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  run = false;

  constructor(private _spinnerservice: SpinnerService) { }

  ngOnInit() {
    this.subscription = this._spinnerservice.SpinnerObservable().subscribe(run => {
      this.run = run;
    });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
