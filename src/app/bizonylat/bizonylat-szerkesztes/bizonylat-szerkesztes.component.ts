import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../penznem/penznem.service';
import {PenznemContainerMode} from '../../penznem/penznemcontainermode';
import {UgyfelContainerMode} from '../../ugyfel/ugyfelcontainermode';
import {ZoomSources} from '../../enums/zoomsources';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {FizetesimodService} from '../../fizetesimod/fizetesimod.service';
import {FizetesimodContainerMode} from '../../fizetesimod/fizetesimodcontainermode';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatEgyMode} from '../bizonylategymode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../penznem/penznemzoomparameter';
import {FizetesimodZoomParameter} from '../../fizetesimod/fiztesimodzoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import * as moment from 'moment';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html',
  styleUrls: ['./bizonylat-szerkesztes.component.css']
})
export class BizonylatSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  fizerr = 'Ismeretlen fizetési mód: ';

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.bizonylatservice.BizonylatKelte = moment(this.bizonylatservice.ComplexDtoEdited.Dto.BIZONYLATKELTE).format('YYYY-MM-DD');
    this.bizonylatservice.TeljesitesKelte = moment(this.bizonylatservice.ComplexDtoEdited.Dto.TELJESITESKELTE).format('YYYY-MM-DD');
    this.bizonylatservice.FizetesiHatarido = moment(this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIHATARIDO).format('YYYY-MM-DD');
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.bizonylatservice.ComplexDtoEdited.Dto.UGYFELNEV || '';
    this._ugyfelservice.zoomsource = ZoomSources.Bizonylat;
    this._ugyfelservice.zoom = true;
    this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.UgyfelZoom;
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.bizonylatservice.ComplexDtoEdited.Dto.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Bizonylat;
    this._penznemservice.zoom = true;
    this._penznemservice.ContainerMode = PenznemContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.PenznemZoom;
  }
  FizetesimodZoom() {
    this._fizetesimodservice.ekDto.minta = this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMOD || '';
    this._fizetesimodservice.zoomsource = ZoomSources.Bizonylat;
    this._fizetesimodservice.zoom = true;
    this._fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.FizetesimodZoom;
  }

  Fiztool(fm: string) {
    this.eppFrissit = true;
    this._fizetesimodservice.Read(fm)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Result.length !== 1) {
          throw this.fizerr + fm;
        }

        this.bizonylatservice.TeljesitesKelte = this.bizonylatservice.BizonylatKelte;
        this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMODKOD = res.Result[0].FIZETESIMODKOD;
        this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMOD = res.Result[0].FIZETESIMOD1;
        this.bizonylatservice.FizetesiHatarido = this.bizonylatservice.BizonylatKelte;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  Bk() {
    this.Fiztool('Bankkártya');
  }
  Kp() {
    this.Fiztool('Készpénz');
  }

  tetelUj() {
    this.eppFrissit = true;
    this.bizonylatservice.CreateNewTetel(this.bizonylatservice.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;

        this.bizonylatservice.teteluj = true;
        this.bizonylatservice.Setszvesz();

        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
        this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  tetelTorles(i: number) {
    this.bizonylatservice.TetelDtoSelectedIndex = i;
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelTorles;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }
  tetelModositas(i: number) {
    this.bizonylatservice.TetelDtoSelectedIndex = i;
    this.bizonylatservice.teteluj = false;
    this.bizonylatservice.Setszvesz();

    this.bizonylatservice.TetelDtoEdited = Object.assign({}, this.bizonylatservice.ComplexDtoEdited.LstTetelDto[i]);
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }

  onSubmit() {
    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.UGYFELKOD,
      this.bizonylatservice.ComplexDtoEdited.Dto.UGYFELNEV))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.PENZNEMKOD,
          this.bizonylatservice.ComplexDtoEdited.Dto.PENZNEM));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.bizonylatservice.bizonylatLeiro.FizetesiModIs) {
          return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMODKOD,
            this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMOD));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bizonylatservice.ComplexDtoEdited.Dto.BIZONYLATKELTE = moment(this.bizonylatservice.BizonylatKelte).toISOString(true);
        this.bizonylatservice.ComplexDtoEdited.Dto.TELJESITESKELTE = moment(this.bizonylatservice.TeljesitesKelte).toISOString(true);
        this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIHATARIDO = moment(this.bizonylatservice.FizetesiHatarido).toISOString(true);

        return this.bizonylatservice.Save(this.bizonylatservice.ComplexDtoEdited);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        return this.bizonylatservice.GetComplex(res3.Result);
      })
      .then(res4 => {
        if (res4.Error != null) {
          throw res4.Error;
        }

        if (this.bizonylatservice.uj) {
          this.bizonylatservice.Dto.unshift(res4.Result[0].Dto);
        } else {
          this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res4.Result[0].Dto;
          this.bizonylatservice.TetelDto = res4.Result[0].LstTetelDto;
          this.bizonylatservice.AfaDto = res4.Result[0].LstAfaDto;
          this.bizonylatservice.TermekdijDto = res4.Result[0].LstTermekdijDto;
        }

        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.bizonylatservice.uj) {
      this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    } else {
      this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
