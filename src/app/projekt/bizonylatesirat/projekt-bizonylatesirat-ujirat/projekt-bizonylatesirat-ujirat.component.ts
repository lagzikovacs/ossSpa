import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {IrattipusService} from '../../../irattipus/irattipus.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {IratService} from '../../../irat/irat/irat.service';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {BizonylatesiratSzerkesztesMode} from '../bizonylatesiratszerkesztesmode';
import {IrattipusContainerMode} from '../../../irattipus/irattipuscontainermode';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujirat',
  templateUrl: './projekt-bizonylatesirat-ujirat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujirat.component.css']
})
export class ProjektBizonylatesiratUjiratComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;
  Keletkezett: any;

  constructor(private _irattipusservice: IrattipusService,
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
    this._irattipusservice.ekDto.minta = this.projektkapcsolatservice.UjIratDto.Irattipus || '';
    this._irattipusservice.zoomsource = ZoomSources.Projektirat;
    this._irattipusservice.zoom = true;
    this._irattipusservice.ContainerMode = IrattipusContainerMode.List;

    this.projektkapcsolatservice.SzerkesztesMode = BizonylatesiratSzerkesztesMode.IrattipusZoom;
  }

  onSubmit() {
    this.projektkapcsolatservice.UjIratDto.Ugyfelkod = this.projektkapcsolatservice.UgyfelKod;
    this.projektkapcsolatservice.UjIratDto.Keletkezett = moment(this.Keletkezett).toISOString(true);

    // TODO zoomcheck
    this._iratservice.Add(this.projektkapcsolatservice.UjIratDto)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParameter(
          this.projektkapcsolatservice.ProjektKod,
          0,
          res.Result,
          undefined
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
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
