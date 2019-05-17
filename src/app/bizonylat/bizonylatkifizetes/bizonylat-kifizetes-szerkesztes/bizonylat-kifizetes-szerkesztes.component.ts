import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {PenznemService} from '../../../penznem/penznem.service';
import {FizetesimodService} from '../../../fizetesimod/fizetesimod.service';
import {ZoomSources} from '../../../enums/zoomsources';
import {PenznemContainerMode} from '../../../penznem/penznemcontainermode';
import {FizetesimodContainerMode} from '../../../fizetesimod/fizetesimodcontainermode';
import {BizonylatKifizetesSzerkesztesMode} from '../bizonylatkifizetesszerkesztesmode';
import * as moment from 'moment';
import {PenznemZoomParameter} from '../../../penznem/penznemzoomparameter';
import {FizetesimodZoomParameter} from '../../../fizetesimod/fiztesimodzoomparameter';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatKifizetesContainerMode} from '../bizonylatkifizetescontainermode';
import {BizonylatKifizetesEgyMode} from '../bizonylatkifizetesegymode';
import {BizonylatService} from '../../bizonylat.service';

@Component({
  selector: 'app-bizonylat-kifizetes-szerkesztes',
  templateUrl: './bizonylat-kifizetes-szerkesztes.component.html',
  styleUrls: ['./bizonylat-kifizetes-szerkesztes.component.css']
})
export class BizonylatKifizetesSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;
  Datum: any;

  constructor(private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _bizonylatservice: BizonylatService,
              bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnInit() {
    this.Datum = moment(this.bizonylatkifizetesservice.DtoEdited.DATUM).format('YYYY-MM-DD');
  }

  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.bizonylatkifizetesservice.DtoEdited.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Bizonylatkifizetes;
    this._penznemservice.zoom = true;
    this._penznemservice.ContainerMode = PenznemContainerMode.List;

    this.bizonylatkifizetesservice.SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.PenznemZoom;
  }
  FizetesimodZoom() {
    this._fizetesimodservice.ekDto.minta = this.bizonylatkifizetesservice.DtoEdited.FIZETESIMOD || '';
    this._fizetesimodservice.zoomsource = ZoomSources.Bizonylatkifizetes;
    this._fizetesimodservice.zoom = true;
    this._fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;

    this.bizonylatkifizetesservice.SzerkesztesMode = BizonylatKifizetesSzerkesztesMode.FizetesimodZoom;
  }

  onSubmit() {
    this.bizonylatkifizetesservice.DtoEdited.BIZONYLATKOD =
      this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod;
    this.bizonylatkifizetesservice.DtoEdited.DATUM = moment(this.Datum).toISOString(true);

    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.bizonylatkifizetesservice.DtoEdited.PENZNEMKOD,
      this.bizonylatkifizetesservice.DtoEdited.PENZNEM))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.bizonylatkifizetesservice.DtoEdited.FIZETESIMODKOD,
          this.bizonylatkifizetesservice.DtoEdited.FIZETESIMOD));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.bizonylatkifizetesservice.uj) {
          return this.bizonylatkifizetesservice.Add(this.bizonylatkifizetesservice.DtoEdited);
        } else {
          return this.bizonylatkifizetesservice.Update(this.bizonylatkifizetesservice.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.bizonylatkifizetesservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        if (this.bizonylatkifizetesservice.uj) {
          this.bizonylatkifizetesservice.Dto.unshift(res3.Result[0]);
        } else {
          this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex] = res3.Result[0];
        }

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
    if (this.bizonylatkifizetesservice.uj) {
      this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
    } else {
      this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
