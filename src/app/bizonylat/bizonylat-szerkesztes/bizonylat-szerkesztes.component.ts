import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {FizetesimodService} from '../../primitiv/fizetesimod/fizetesimod.service';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatEgyMode} from '../bizonylategymode';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {FizetesimodZoomParameter} from '../../primitiv/fizetesimod/fiztesimodzoomparameter';
import {EmptyResult} from '../../dtos/emptyresult';
import * as moment from 'moment';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {FizetesimodDto} from '../../primitiv/fizetesimod/fizetesimoddto';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html'
})
export class BizonylatSzerkesztesComponent implements OnInit, OnDestroy {
  bizonylatservice: BizonylatService;
  fizerr = 'Ismeretlen fizetési mód: ';

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.bizonylatservice.BizonylatKelte = moment(this.bizonylatservice.ComplexDtoEdited.Dto.Bizonylatkelte).format('YYYY-MM-DD');
    this.bizonylatservice.TeljesitesKelte = moment(this.bizonylatservice.ComplexDtoEdited.Dto.Teljesiteskelte).format('YYYY-MM-DD');
    this.bizonylatservice.FizetesiHatarido = moment(this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesihatarido).format('YYYY-MM-DD');
  }

  UgyfelZoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.UgyfelZoom;
    this._cdr.detectChanges();
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkod = Dto.Ugyfelkod;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelnev = Dto.Nev;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelcim = Dto.Cim;

    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfeladoszam = Dto.Adoszam;

    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfeliranyitoszam = Dto.Iranyitoszam;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhelysegkod = Dto.Helysegkod;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhelysegnev = Dto.Helysegnev;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkozterulet = Dto.Kozterulet;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkozterulettipus = Dto.Kozterulettipus;
    this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelhazszam = Dto.Hazszam;

    this._cdr.detectChanges();
  }
  onUgyfelStopzoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
  }

  PenznemZoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.PenznemZoom;
    this._cdr.detectChanges();
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.bizonylatservice.ComplexDtoEdited.Dto.Penznemkod = Dto.Penznemkod;
    this.bizonylatservice.ComplexDtoEdited.Dto.Penznem = Dto.Penznem1;
  }
  onPenznemStopzoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
  }

  FizetesimodZoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.FizetesimodZoom;
    this._cdr.detectChanges();
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimodkod = Dto.Fizetesimodkod;
    this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimod = Dto.Fizetesimod1;
    this._cdr.detectChanges();
  }
  onFizetesimodStopzoom() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
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
        this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimodkod = res.Result[0].Fizetesimodkod;
        this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimod = res.Result[0].Fizetesimod1;
        this.bizonylatservice.FizetesiHatarido = this.bizonylatservice.BizonylatKelte;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
        this._cdr.detectChanges();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  tetelTorles(i: number) {
    this.bizonylatservice.TetelDtoSelectedIndex = i;
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelTorles;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this._cdr.detectChanges();
  }
  tetelModositas(i: number) {
    this.bizonylatservice.TetelDtoSelectedIndex = i;
    this.bizonylatservice.teteluj = false;
    this.bizonylatservice.Setszvesz();

    this.bizonylatservice.TetelDtoEdited = deepCopy(this.bizonylatservice.ComplexDtoEdited.LstTetelDto[i]);
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
    this._cdr.detectChanges();
  }

  onSubmit() {
    this.eppFrissit = true;

    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelkod,
      this.bizonylatservice.ComplexDtoEdited.Dto.Ugyfelnev))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.Penznemkod,
          this.bizonylatservice.ComplexDtoEdited.Dto.Penznem));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.bizonylatservice.bizonylatLeiro.FizetesiModIs) {
          return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimodkod,
            this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesimod));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bizonylatservice.ComplexDtoEdited.Dto.Bizonylatkelte = moment(this.bizonylatservice.BizonylatKelte).toISOString(true);
        this.bizonylatservice.ComplexDtoEdited.Dto.Teljesiteskelte = moment(this.bizonylatservice.TeljesitesKelte).toISOString(true);
        this.bizonylatservice.ComplexDtoEdited.Dto.Fizetesihatarido = moment(this.bizonylatservice.FizetesiHatarido).toISOString(true);

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
