import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ugyfel-ter',
  templateUrl: './ugyfel-ter.component.html',
  styleUrls: ['./ugyfel-ter.component.css']
})
export class UgyfelTerComponent implements OnInit, OnDestroy {
  up: string;
  private _sub: any;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.up = params['up'] || '';
      });
  }
  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
