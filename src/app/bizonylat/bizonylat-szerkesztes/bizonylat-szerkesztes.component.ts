import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {FizetesimodService} from '../../primitiv/fizetesimod/fizetesimod.service';
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
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatComplexDto} from '../bizonylatcomplexdto';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {BizonylatAfaDto} from '../bizonylatafadto';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';
import {BizonylatteteltablaComponent} from '../bizonylatteteltabla/bizonylatteteltabla.component';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html'
})
export class BizonylatSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild('teteltabla') tabla: BizonylatteteltablaComponent;

  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() uj = false;
  @Input() Bizonylatkod = -1;

  fizerr = 'Ismeretlen fizetési mód: ';

  ComplexDtoEdited: BizonylatComplexDto;

  teteluj = false;
  TetelDtoEdited = new BizonylatTetelDto();
  TetelDtoSelectedIndex = -1;

  szvesz = false;

  BizonylatKelte: any;
  TeljesitesKelte: any;
  FizetesiHatarido: any;

  SzerkesztesMode = BizonylatSzerkesztesMode.List;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  bizonylatservice: BizonylatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.ComplexDtoEdited = new BizonylatComplexDto();
    this.ComplexDtoEdited.Dto = new BizonylatDto();
    this.ComplexDtoEdited.LstTetelDto = new Array<BizonylatTetelDto>();
    this.ComplexDtoEdited.LstAfaDto = new Array<BizonylatAfaDto>();
    this.ComplexDtoEdited.LstTermekdijDto = new Array<BizonylatTermekdijDto>();
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.bizonylatservice.CreateNewComplex()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.ComplexDtoEdited = res.Result[0];
          this.ComplexDtoEdited.Dto.Bizonylattipuskod = this.bizonylatTipus;
          this.datumok();
          this.eppFrissit = false;
          this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.eppFrissit = true;
      this.bizonylatservice.GetComplex(this.Bizonylatkod)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ComplexDtoEdited = res.Result[0];
          this.datumok();
          this.eppFrissit = false;
          this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  datumok() {
    this.BizonylatKelte = moment(this.ComplexDtoEdited.Dto.Bizonylatkelte).format('YYYY-MM-DD');
    this.TeljesitesKelte = moment(this.ComplexDtoEdited.Dto.Teljesiteskelte).format('YYYY-MM-DD');
    this.FizetesiHatarido = moment(this.ComplexDtoEdited.Dto.Fizetesihatarido).format('YYYY-MM-DD');
  }

  UgyfelZoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.UgyfelZoom;
    this._cdr.detectChanges();
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.ComplexDtoEdited.Dto.Ugyfelkod = Dto.Ugyfelkod;
    this.ComplexDtoEdited.Dto.Ugyfelnev = Dto.Nev;
    this.ComplexDtoEdited.Dto.Ugyfelcim = Dto.Cim;

    this.ComplexDtoEdited.Dto.Ugyfeladoszam = Dto.Adoszam;

    this.ComplexDtoEdited.Dto.Ugyfeliranyitoszam = Dto.Iranyitoszam;
    this.ComplexDtoEdited.Dto.Ugyfelhelysegkod = Dto.Helysegkod;
    this.ComplexDtoEdited.Dto.Ugyfelhelysegnev = Dto.Helysegnev;
    this.ComplexDtoEdited.Dto.Ugyfelkozterulet = Dto.Kozterulet;
    this.ComplexDtoEdited.Dto.Ugyfelkozterulettipus = Dto.Kozterulettipus;
    this.ComplexDtoEdited.Dto.Ugyfelhazszam = Dto.Hazszam;

    this._cdr.detectChanges();
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
  }


  PenznemZoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.PenznemZoom;
    this._cdr.detectChanges();
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.ComplexDtoEdited.Dto.Penznemkod = Dto.Penznemkod;
    this.ComplexDtoEdited.Dto.Penznem = Dto.Penznem1;
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this._cdr.detectChanges();
  }


  FizetesimodZoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.FizetesimodZoom;
    this._cdr.detectChanges();
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.ComplexDtoEdited.Dto.Fizetesimodkod = Dto.Fizetesimodkod;
    this.ComplexDtoEdited.Dto.Fizetesimod = Dto.Fizetesimod1;
    this._cdr.detectChanges();
  }
  onFizetesimodStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
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

        this.TeljesitesKelte = this.BizonylatKelte;
        this.ComplexDtoEdited.Dto.Fizetesimodkod = res.Result[0].Fizetesimodkod;
        this.ComplexDtoEdited.Dto.Fizetesimod = res.Result[0].Fizetesimod1;
        this.FizetesiHatarido = this.BizonylatKelte;
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



  public Setszvesz() {
    this.szvesz = this.bizonylatTipus === BizonylatTipus.Szamla ||
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla ||
      this.bizonylatTipus === BizonylatTipus.Szallito;
  }

  onTetelUjElott() {
    this.eppFrissit = true;
    this.bizonylatservice.CreateNewTetel(this.bizonylatLeiro.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoSelectedIndex = -1;
        this.teteluj = true;
        this.Setszvesz();

        this.TetelDtoEdited = res.Result[0];
        this._cdr.detectChanges();

        this.eppFrissit = false;
        this.tabla.doUj();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onTetelTorlesElott(i: number) {
    this.TetelDtoSelectedIndex = i;
    this._cdr.detectChanges();
  }
  onTeteltorles(ok: boolean) {

  }

  onTetelModositasElott(i: number) {
    this.TetelDtoSelectedIndex = i;
    this.teteluj = false;
    this.Setszvesz();

    this.TetelDtoEdited = deepCopy(this.ComplexDtoEdited.LstTetelDto[i]);
    this._cdr.detectChanges();
  }



  onSubmit() {
    this.eppFrissit = true;

    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.ComplexDtoEdited.Dto.Ugyfelkod,
      this.ComplexDtoEdited.Dto.Ugyfelnev))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.ComplexDtoEdited.Dto.Penznemkod,
          this.ComplexDtoEdited.Dto.Penznem));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.bizonylatLeiro.FizetesiModIs) {
          return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParameter(this.ComplexDtoEdited.Dto.Fizetesimodkod,
            this.ComplexDtoEdited.Dto.Fizetesimod));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.ComplexDtoEdited.Dto.Bizonylatkelte = moment(this.BizonylatKelte).toISOString(true);
        this.ComplexDtoEdited.Dto.Teljesiteskelte = moment(this.TeljesitesKelte).toISOString(true);
        this.ComplexDtoEdited.Dto.Fizetesihatarido = moment(this.FizetesiHatarido).toISOString(true);

        return this.bizonylatservice.Save(this.ComplexDtoEdited);
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

        // if (this.bizonylatservice.uj) {
        //   this.bizonylatservice.Dto.unshift(res4.Result[0].Dto);
        // } else {
        //   this.bizonylatservice.Dto[this.bizonylatservice.DtoSelectedIndex] = res4.Result[0].Dto;
        //   this.bizonylatservice.TetelDto = res4.Result[0].LstTetelDto;
        //   this.bizonylatservice.AfaDto = res4.Result[0].LstAfaDto;
        //   this.bizonylatservice.TermekdijDto = res4.Result[0].LstTermekdijDto;
        // }

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
    if (this.uj) {
      // this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    } else {
      // this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
