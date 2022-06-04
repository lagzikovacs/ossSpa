import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {PenznemService} from '../../../01 Torzsadatok/03 Penznem/penznem.service';
import {FizetesimodService} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod.service';
import {UgyfelZoomParam} from '../../../01 Torzsadatok/09 Ugyfel/ugyfelzoomparam';
import {PenznemZoomParam} from '../../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {FizetesimodZoomParam} from '../../../01 Torzsadatok/02 Fizetesimod/fiztesimodzoomparam';
import * as moment from 'moment';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatComplexDto} from '../bizonylatcomplexdto';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTetelDto} from '../../bizonylattetel/bizonylatteteldto';
import {BizonylatAfaDto} from '../bizonylatafadto';
import {BizonylatTermekdijDto} from '../bizonylattermekdijdto';
import {BizonylatteteltablaComponent} from '../bizonylatteteltabla/bizonylatteteltabla.component';
import {propCopy} from '../../../common/propCopy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatComplexResult} from '../bizonylatcomplexresult';
import {UgyfelListComponent} from '../../../01 Torzsadatok/09 Ugyfel/ugyfel-list/ugyfel-list.component';
import {ModalService} from '../../../common/modal/modal.service';
import {PenznemListComponent} from '../../../01 Torzsadatok/03 Penznem/penznem-list/penznem-list.component';
import {FizetesimodListComponent} from '../../../01 Torzsadatok/02 Fizetesimod/fizetesimod-list/fizetesimod-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html'
})
export class BizonylatSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_bizonylatszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_bizonylatszerk';
  bodyclass = '';

  @ViewChild('teteltabla', {static: true}) tabla: BizonylatteteltablaComponent;

  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Input() uj = false;
  @Input() Bizonylatkod = -1;
  @Output() eventOk = new EventEmitter<BizonylatDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  fizerr = 'Ismeretlen fizetési mód: ';

  ComplexDtoEdited: BizonylatComplexDto;

  teteluj = false;
  TetelDtoEdited = new BizonylatTetelDto();
  TetelDtoSelectedIndex = -1;

  szvesz = false;

  formFej: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _modalservice: ModalService,
              bizonylatservice: BizonylatService) {
    super();

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

  async ngOnInit() {
    this.spinner = true;
    try {
      let res: BizonylatComplexResult;
      if (this.uj) {
        res = await this.bizonylatservice.CreateNewComplex();
      } else {
        res = await this.bizonylatservice.GetComplex(this.Bizonylatkod);
      }
      if (res.Error !== null) {
        throw res.Error;
      }

      this.ComplexDtoEdited = res.Result[0];
      if (this.uj) {
        this.ComplexDtoEdited.Dto.Bizonylattipuskod = this.bizonylatTipus;
      }

      this.updateform();
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
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

    this.vcr.clear();
    const C = this.vcr.createComponent(UgyfelListComponent);
    C.instance.maszk = this.ComplexDtoEdited.Dto.Ugyfelnev || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.ComplexDtoEdited.Dto.Ugyfelkod = dto.Ugyfelkod;
      this.ComplexDtoEdited.Dto.Ugyfelnev = dto.Nev;
      this.ComplexDtoEdited.Dto.Ugyfelcim = dto.Cim;

      this.ComplexDtoEdited.Dto.Ugyfeladoszam = dto.Adoszam;

      this.ComplexDtoEdited.Dto.Ugyfeliranyitoszam = dto.Iranyitoszam;
      this.ComplexDtoEdited.Dto.Ugyfelhelysegkod = dto.Helysegkod;
      this.ComplexDtoEdited.Dto.Ugyfelhelysegnev = dto.Helysegnev;
      this.ComplexDtoEdited.Dto.Ugyfelkozterulet = dto.Kozterulet;
      this.ComplexDtoEdited.Dto.Ugyfelkozterulettipus = dto.Kozterulettipus;
      this.ComplexDtoEdited.Dto.Ugyfelhazszam = dto.Hazszam;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-complex';
    this._modalservice.open(this.modalname);
  }

  PenznemZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(PenznemListComponent);
    C.instance.maszk = this.ComplexDtoEdited.Dto.Penznem || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.ComplexDtoEdited.Dto.Penznemkod = dto.Penznemkod;
      this.ComplexDtoEdited.Dto.Penznem = dto.Penznem1;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  FizetesimodZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(FizetesimodListComponent);
    C.instance.maszk = this.ComplexDtoEdited.Dto.Fizetesimod || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.ComplexDtoEdited.Dto.Fizetesimodkod = dto.Fizetesimodkod;
      this.ComplexDtoEdited.Dto.Fizetesimod = dto.Fizetesimod1;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  async Fiztool(fm: string) {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._fizetesimodservice.Read(fm);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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

  async onTetelUjElott() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.bizonylatservice.CreateNewTetel(this.bizonylatTipus);
      if (res.Error != null) {
        throw res.Error;
      }

      this.TetelDtoEdited = res.Result[0];
      this.TetelDtoSelectedIndex = -1;
      this.teteluj = true;
      this.Setszvesz();

      this.spinner = false;
      this.tabla.doUj();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onTetelTorlesElott(i: number) {
    this.updatedto();

    this.TetelDtoSelectedIndex = i;
  }

  async onTeteltorles(ok: boolean) {
    if (ok) {
      this.ComplexDtoEdited.LstTetelDto.splice(this.TetelDtoSelectedIndex, 1);

      this.spinner = true;
      try {
        const res = await this.bizonylatservice.SumEsAfaEsTermekdij(this.ComplexDtoEdited);
        if (res.Error != null) {
          throw res.Error;
        }

        this.ComplexDtoEdited = res.Result[0];

        this.tabla.clearselections();
        this.updateform();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    }
  }

  onTetelModositasElott(i: number) {
    this.updatedto();

    this.TetelDtoSelectedIndex = i;
    this.teteluj = false;
    this.Setszvesz();

    this.TetelDtoEdited = deepCopy(this.ComplexDtoEdited.LstTetelDto[i]);
  }

  async onUjModositasUtan(dto: BizonylatTetelDto) {
    if (dto !== null) {
      if (this.teteluj) {
        // a lista végére teszi, h a sorrend a user szándékának feleljen meg
        this.ComplexDtoEdited.LstTetelDto.push(dto);
      } else {
        propCopy(dto, this.ComplexDtoEdited.LstTetelDto[this.TetelDtoSelectedIndex]);
      }

      this.spinner = true;
      try {
        const res = await this.bizonylatservice.SumEsAfaEsTermekdij(this.ComplexDtoEdited);
        if (res.Error != null) {
          throw res.Error;
        }

        this.ComplexDtoEdited = res.Result[0];

        this.tabla.egysem();
        this.updateform();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.tabla.egysem();
    }
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._ugyfelservice.ZoomCheck(new UgyfelZoomParam(this.ComplexDtoEdited.Dto.Ugyfelkod,
        this.ComplexDtoEdited.Dto.Ugyfelnev));
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this._penznemservice.ZoomCheck(new PenznemZoomParam(this.ComplexDtoEdited.Dto.Penznemkod,
        this.ComplexDtoEdited.Dto.Penznem));
      if (res1.Error != null) {
        throw res1.Error;
      }

      if (this.bizonylatLeiro.FizetesiModIs) {
        const res2 = await this._fizetesimodservice.ZoomCheck(new FizetesimodZoomParam(this.ComplexDtoEdited.Dto.Fizetesimodkod,
          this.ComplexDtoEdited.Dto.Fizetesimod));
        if (res2.Error != null) {
          throw res2.Error;
        }
      }

      const res3 = await this.bizonylatservice.Save(this.ComplexDtoEdited);
      if (res3.Error != null) {
        throw res3.Error;
      }

      const res4 = await this.bizonylatservice.GetComplex(res3.Result);
      if (res4.Error != null) {
        throw res4.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res4.Result[0].Dto);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }

  }

  onCancel() {
    this.eventMegsem.emit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
