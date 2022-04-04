import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {PenznemService} from '../../01 Torzsadatok/03 Penznem/penznem.service';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {FizetesimodService} from '../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {UgyfelZoomParam} from '../../01 Torzsadatok/09 Ugyfel/ugyfelzoomparam';
import {PenznemZoomParam} from '../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {FizetesimodZoomParam} from '../../01 Torzsadatok/02 Fizetesimod/fiztesimodzoomparam';
import {EmptyResult} from '../../common/dtos/emptyresult';
import * as moment from 'moment';
import {deepCopy} from '../../common/deepCopy';
import {ErrorService} from '../../common/errorbox/error.service';
import {PenznemDto} from '../../01 Torzsadatok/03 Penznem/penznemdto';
import {FizetesimodDto} from '../../01 Torzsadatok/02 Fizetesimod/fizetesimoddto';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatComplexDto} from '../bizonylatcomplexdto';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTetelDto} from '../bizonylatteteldto';
import {BizonylatAfaDto} from '../bizonylatafadto';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';
import {BizonylatteteltablaComponent} from '../bizonylatteteltabla/bizonylatteteltabla.component';
import {propCopy} from '../../common/propCopy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html'
})
export class BizonylatSzerkesztesComponent implements OnInit, OnDestroy {
  @ViewChild('teteltabla', {static: true}) tabla: BizonylatteteltablaComponent;

  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() uj = false;
  @Input() Bizonylatkod = -1;
  @Output() eventSzerkesztesUtan = new EventEmitter<BizonylatDto>();

  fizerr = 'Ismeretlen fizetési mód: ';

  ComplexDtoEdited: BizonylatComplexDto;

  teteluj = false;
  TetelDtoEdited = new BizonylatTetelDto();
  TetelDtoSelectedIndex = -1;

  szvesz = false;

  SzerkesztesMode = BizonylatSzerkesztesMode.List;

  formFej: FormGroup;
  eppFrissit = false;

  bizonylatzoombox: any;

  bizonylatservice: BizonylatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.ComplexDtoEdited = new BizonylatComplexDto();
    this.ComplexDtoEdited.Dto = new BizonylatDto();
    this.ComplexDtoEdited.LstTetelDto = new Array<BizonylatTetelDto>();
    this.ComplexDtoEdited.LstAfaDto = new Array<BizonylatAfaDto>();
    this.ComplexDtoEdited.LstTermekdijDto = new Array<BizonylatTermekdijDto>();

    this.formFej = this._fb.group({
      'ugyfelnev': ['', [Validators.required, Validators.maxLength(200)]],
      'cim': [{value: '', disabled: true}, []],
      'megjegyzes': ['', [Validators.maxLength(200)]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'arfolyam': [0, [Validators.required]],
      'fizetesimod': ['', [Validators.maxLength(20)]],
      'bizonylatkelte': ['', [Validators.required]],
      'teljesiteskelte': ['', [Validators.required]],
      'fizetesihatarido': ['', [Validators.required]],
      'netto': [{value: 0, disabled: true}, []],
      'afa': [{value: 0, disabled: true}, []],
      'brutto': [{value: 0, disabled: true}, []],
    });
  }

  ngOnInit() {
    this.bizonylatzoombox = document.getElementById('bizonylatzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.bizonylatservice.CreateNewComplex()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.ComplexDtoEdited = res.Result[0];
          this.ComplexDtoEdited.Dto.Bizonylattipuskod = this.bizonylatTipus;

          this.updateform();
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

          this.updateform();
          this.eppFrissit = false;
          this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  updateform() {
    this.formFej.controls['ugyfelnev'].setValue(this.ComplexDtoEdited.Dto.Ugyfelnev);
    this.formFej.controls['cim'].setValue(this.ComplexDtoEdited.Dto.Ugyfelcim);
    this.formFej.controls['megjegyzes'].setValue(this.ComplexDtoEdited.Dto.Megjegyzesfej);
    this.formFej.controls['penznem'].setValue(this.ComplexDtoEdited.Dto.Penznem);
    this.formFej.controls['arfolyam'].setValue(this.ComplexDtoEdited.Dto.Arfolyam);
    this.formFej.controls['fizetesimod'].setValue(this.ComplexDtoEdited.Dto.Fizetesimod);

    this.formFej.controls['bizonylatkelte'].setValue(moment(this.ComplexDtoEdited.Dto.Bizonylatkelte).format('YYYY-MM-DD'));
    this.formFej.controls['teljesiteskelte'].setValue(moment(this.ComplexDtoEdited.Dto.Teljesiteskelte).format('YYYY-MM-DD'));
    this.formFej.controls['fizetesihatarido'].setValue(moment(this.ComplexDtoEdited.Dto.Fizetesihatarido).format('YYYY-MM-DD'));

    this.formFej.controls['netto'].setValue(this.ComplexDtoEdited.Dto.Netto);
    this.formFej.controls['afa'].setValue(this.ComplexDtoEdited.Dto.Afa);
    this.formFej.controls['brutto'].setValue(this.ComplexDtoEdited.Dto.Brutto);
  }
  updatedto() {
    this.ComplexDtoEdited.Dto.Ugyfelnev = this.formFej.value['ugyfelnev'];
    // this.ComplexDtoEdited.Dto.Ugyfelcim = this.formFej.value['cim'];
    this.ComplexDtoEdited.Dto.Megjegyzesfej = this.formFej.value['megjegyzes'];
    this.ComplexDtoEdited.Dto.Penznem = this.formFej.value['penznem'];
    this.ComplexDtoEdited.Dto.Arfolyam = this.formFej.value['arfolyam'];
    this.ComplexDtoEdited.Dto.Fizetesimod = this.formFej.value['fizetesimod'];

    this.ComplexDtoEdited.Dto.Bizonylatkelte = moment(this.formFej.value['bizonylatkelte']).toISOString(true);
    this.ComplexDtoEdited.Dto.Teljesiteskelte = moment(this.formFej.value['teljesiteskelte']).toISOString(true);
    this.ComplexDtoEdited.Dto.Fizetesihatarido = moment(this.formFej.value['fizetesihatarido']).toISOString(true);

    // this.ComplexDtoEdited.Dto.Netto = this.formFej.value['netto'];
    // this.ComplexDtoEdited.Dto.Afa = this.formFej.value['afa'];
    // this.ComplexDtoEdited.Dto.Brutto = this.formFej.value['brutto'];
  }

  UgyfelZoom() {
    this.updatedto();

    this.SzerkesztesMode = BizonylatSzerkesztesMode.UgyfelZoom;
    this.bizonylatzoombox.style.display = 'block';
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

    this.updateform();
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this.bizonylatzoombox.style.display = 'none';
  }


  PenznemZoom() {
    this.updatedto();

    this.SzerkesztesMode = BizonylatSzerkesztesMode.PenznemZoom;
    this.bizonylatzoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.ComplexDtoEdited.Dto.Penznemkod = Dto.Penznemkod;
    this.ComplexDtoEdited.Dto.Penznem = Dto.Penznem1;

    this.updateform();
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this.bizonylatzoombox.style.display = 'none';
  }


  FizetesimodZoom() {
    this.updatedto();

    this.SzerkesztesMode = BizonylatSzerkesztesMode.FizetesimodZoom;
    this.bizonylatzoombox.style.display = 'block';
  }
  onFizetesimodSelectzoom(Dto: FizetesimodDto) {
    this.ComplexDtoEdited.Dto.Fizetesimodkod = Dto.Fizetesimodkod;
    this.ComplexDtoEdited.Dto.Fizetesimod = Dto.Fizetesimod1;

    this.updateform();
  }
  onFizetesimodStopzoom() {
    this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
    this.bizonylatzoombox.style.display = 'none';
  }

  Fiztool(fm: string) {
    this.eppFrissit = true;
    this.updatedto();

    this._fizetesimodservice.Read(fm)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Result.length !== 1) {
          throw this.fizerr + fm;
        }

        this.ComplexDtoEdited.Dto.Teljesiteskelte = this.ComplexDtoEdited.Dto.Bizonylatkelte;
        this.ComplexDtoEdited.Dto.Fizetesimodkod = res.Result[0].Fizetesimodkod;
        this.ComplexDtoEdited.Dto.Fizetesimod = res.Result[0].Fizetesimod1;
        this.ComplexDtoEdited.Dto.Fizetesihatarido = this.ComplexDtoEdited.Dto.Bizonylatkelte;

        this.updateform();
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
      this.bizonylatTipus === BizonylatTipus.ElolegSzamla;
  }

  onTetelUjElott() {
    this.eppFrissit = true;
    this.updatedto();

    this.bizonylatservice.CreateNewTetel(this.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.TetelDtoSelectedIndex = -1;
        this.teteluj = true;
        this.Setszvesz();

        this.TetelDtoEdited = res.Result[0];

        this.eppFrissit = false;
        this.tabla.doUj();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onTetelTorlesElott(i: number) {
    this.updatedto();

    this.TetelDtoSelectedIndex = i;
  }
  onTeteltorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;
      this.ComplexDtoEdited.LstTetelDto.splice(this.TetelDtoSelectedIndex, 1);
      this.bizonylatservice.SumEsAfaEsTermekdij(this.ComplexDtoEdited)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ComplexDtoEdited = res.Result[0];

          this.tabla.clearselections();
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onTetelModositasElott(i: number) {
    this.updatedto();

    this.TetelDtoSelectedIndex = i;
    this.teteluj = false;
    this.Setszvesz();

    this.TetelDtoEdited = deepCopy(this.ComplexDtoEdited.LstTetelDto[i]);
  }

  onUjModositasUtan(dto: BizonylatTetelDto) {
    if (dto !== null) {
      if (this.teteluj) {
        // a lista végére teszi, h a sorrend a user szándékának feleljen meg
        this.ComplexDtoEdited.LstTetelDto.push(dto);
      } else {
        propCopy(dto, this.ComplexDtoEdited.LstTetelDto[this.TetelDtoSelectedIndex]);
      }

      this.eppFrissit = true;
      this.bizonylatservice.SumEsAfaEsTermekdij(this.ComplexDtoEdited)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ComplexDtoEdited = res.Result[0];


          this.tabla.egysem();
          this.SzerkesztesMode = BizonylatSzerkesztesMode.List;
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.tabla.egysem();
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._ugyfelservice.ZoomCheck(new UgyfelZoomParam(this.ComplexDtoEdited.Dto.Ugyfelkod,
      this.ComplexDtoEdited.Dto.Ugyfelnev))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParam(this.ComplexDtoEdited.Dto.Penznemkod,
          this.ComplexDtoEdited.Dto.Penznem));
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.bizonylatLeiro.FizetesiModIs) {
          return this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParam(this.ComplexDtoEdited.Dto.Fizetesimodkod,
            this.ComplexDtoEdited.Dto.Fizetesimod));
        } else {
          return new Promise<EmptyResult>((resolve, reject) => { resolve(new EmptyResult()); });
        }
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

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

        this.eppFrissit = false;
        this.eventSzerkesztesUtan.emit(res4.Result[0].Dto);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this.eventSzerkesztesUtan.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
