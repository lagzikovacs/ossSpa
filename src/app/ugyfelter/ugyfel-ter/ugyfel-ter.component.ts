import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UgyfelterService} from '../ugyfelter.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelterDto} from '../ugyfelterdto';

@Component({
  selector: 'app-ugyfel-ter',
  templateUrl: './ugyfel-ter.component.html',
  styleUrls: ['./ugyfel-ter.component.css']
})
export class UgyfelTerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  up: string;
  private _sub: any;
  bejelentkezve = false;
  eppFrissit = false;
  Dto = new UgyfelterDto();

  constructor(private _route: ActivatedRoute,
              private _ugyfelterservice: UgyfelterService) { }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.up = params['up'] || '';
      });
  }

  folytatas() {
    this.eppFrissit = true;
    this._ugyfelterservice.UgyfelterCheck(this.up)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        // TODO logonservice-be beírni a sid-et stb
        this.Dto = res.Result;

        this.bejelentkezve = true;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setProjektClickedRow(i: number) {

  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
