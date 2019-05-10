import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UgyfelterService} from '../ugyfelter.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelterDto} from '../ugyfelterdto';
import {ProjektkapcsolatService} from '../../projekt/bizonylatesirat/projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';

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
  projektkod = 0;

  constructor(private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _ugyfelterservice: UgyfelterService,
              private _projektkapcsolatservice: ProjektkapcsolatService) { }

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

        this.Dto = res.Result;
        this._logonservice.Sid = res.Result.sid;

        this.bejelentkezve = true;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  setProjektClickedRow(i: number) {
    this.projektkod = this.Dto.projektDto[i].Projektkod;
    this._projektkapcsolatservice.ProjektKod = this.Dto.projektDto[i].Projektkod;
    this._projektkapcsolatservice.KeresesForUgyfelter()
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
