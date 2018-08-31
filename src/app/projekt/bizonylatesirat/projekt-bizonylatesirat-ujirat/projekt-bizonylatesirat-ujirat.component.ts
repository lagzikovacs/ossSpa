import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {IrattipusService} from '../../../irattipus/irattipus.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {IratService} from '../../../irat/irat/irat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektKapcsolatParameter} from '../../../dtos/projekt/projektkapcsolatparameter';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujirat',
  templateUrl: './projekt-bizonylatesirat-ujirat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujirat.component.css']
})
export class ProjektBizonylatesiratUjiratComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _irattipusservice: IrattipusService,
              private _iratservice: IratService,
              private _projektservice: ProjektService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
    this.Keletkezett = moment().format('YYYY-MM-DD');

    this.eppFrissit = true;
    this._iratservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektkapcsolatservice.UjIratDto = res.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  IrattipusZoom() {
    this._irattipusservice.ekDto.minta = this.projektkapcsolatservice.UjIratDto.IRATTIPUS || '';
    this._irattipusservice.zoomsource = ZoomSources.Projektirat;
    this._irattipusservice.zoom = true;
    this._router.navigate(['irattipus-list'], {relativeTo: this._route});
  }

  onSubmit() {
    this.projektkapcsolatservice.UjIratDto.UGYFELKOD = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].UGYFELKOD;
    this.projektkapcsolatservice.UjIratDto.KELETKEZETT = moment(this.Keletkezett).toISOString(true);
    this._iratservice.Add(this.projektkapcsolatservice.UjIratDto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
          this._projektservice.Dto[this._projektservice.DtoSelectedIndex].PROJEKTKOD,
          0,
          res.Result,
        ));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        return this.projektkapcsolatservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.projektkapcsolatservice.Dto.unshift(res2.Result[0]);

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
    this._router.navigate(['../bizonylatesirat'], {relativeTo: this._route});
  }
}
