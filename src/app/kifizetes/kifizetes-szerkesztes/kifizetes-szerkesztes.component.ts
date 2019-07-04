import {Component, OnDestroy, OnInit} from '@angular/core';
import {KifizetesService} from '../kifizetes.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {FizetesimodService} from '../../primitiv/fizetesimod/fizetesimod.service';
import {ZoomSources} from '../../enums/zoomsources';
import {KifizetesSzerkesztesMode} from '../kifizetesszerkesztesmode';
import * as moment from 'moment';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {FizetesimodZoomParameter} from '../../primitiv/fizetesimod/fiztesimodzoomparameter';
import {KifizetesContainerMode} from '../kifizetescontainermode';
import {KifizetesEgyMode} from '../kifizetesegymode';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {propCopy} from '../../tools/propCopy';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {FizetesimodDto} from '../../primitiv/fizetesimod/fizetesimoddto';

@Component({
  selector: 'app-kifizetes-szerkesztes',
  templateUrl: './kifizetes-szerkesztes.component.html'
})
export class KifizetesSzerkesztesComponent implements OnInit, OnDestroy {
  bizonylatkifizetesservice: KifizetesService;
  Datum: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              bizonylatkifizetesservice: KifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ngOnInit() {
    this.Datum = moment(this.bizonylatkifizetesservice.DtoEdited.Datum).format('YYYY-MM-DD');
  }

  PenznemZoom() {
    this.bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.PenznemZoom;
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.bizonylatkifizetesservice.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.bizonylatkifizetesservice.DtoEdited.Penznem = Dto.Penznem1;
  }
  onPenznemStopzoom() {
    this.bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
  }

  FizetesimodZoom() {
    this.bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.FizetesimodZoom;
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.bizonylatkifizetesservice.DtoEdited.Fizetesimodkod = Dto.Fizetesimodkod;
    this.bizonylatkifizetesservice.DtoEdited.Fizetesimod = Dto.Fizetesimod1;
  }
  onFizetesimodStopzoom() {
    this.bizonylatkifizetesservice.SzerkesztesMode = KifizetesSzerkesztesMode.Blank;
  }

  onSubmit() {
    this.bizonylatkifizetesservice.DtoEdited.Bizonylatkod =
      this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod;
    this.bizonylatkifizetesservice.DtoEdited.Datum = moment(this.Datum).toISOString(true);

    this.eppFrissit = true;
    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.bizonylatkifizetesservice.DtoEdited.Penznemkod,
      this.bizonylatkifizetesservice.DtoEdited.Penznem))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.bizonylatkifizetesservice.DtoEdited.Fizetesimodkod,
          this.bizonylatkifizetesservice.DtoEdited.Fizetesimod));
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
          propCopy(res3.Result[0], this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex]);
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.bizonylatkifizetesservice.uj) {
      this.bizonylatkifizetesservice.ContainerMode = KifizetesContainerMode.List;
    } else {
      this.bizonylatkifizetesservice.EgyMode = KifizetesEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
