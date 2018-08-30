import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjektteendoService} from '../projektteendo.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-teendo-elvegezve',
  templateUrl: './projekt-teendo-elvegezve.component.html',
  styleUrls: ['./projekt-teendo-elvegezve.component.css']
})
export class ProjektTeendoElvegezveComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;
  Elvegezve: any;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ngOnInit() {
    this.Elvegezve = moment().format('YYYY-MM-DD');
  }

  onSubmit() {
    this.projektteendoservice.DtoEdited.ELVEGEZVE = moment(this.Elvegezve).toISOString(true);
    this.projektteendoservice.Update(this.projektteendoservice.DtoEdited)
    .then(res1 => {
      if (res1.Error !== null) {
        throw res1.Error;
      }

      return this.projektteendoservice.Get(res1.Result);
    })
    .then(res2 => {
      if (res2.Error !== null) {
        throw res2.Error;
      }

      this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex] = res2.Result[0];

      this.eppFrissit = false;
      this.navigal();
    })
    .catch(err => {
      this.errormodal.show(err);
      this.eppFrissit = false;
    });
  }

  cancel() {
    this.navigal();
  }

  navigal() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
