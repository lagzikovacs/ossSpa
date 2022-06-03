import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IratService} from '../irat.service';
import {IrattipusService} from '../../../../01 Torzsadatok/01 Irattipus/irattipus.service';
import * as moment from 'moment';
import {UgyfelService} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {IrattipusZoomParam} from '../../../../01 Torzsadatok/01 Irattipus/irattipuszoomparam';
import {UgyfelZoomParam} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfelzoomparam';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {deepCopy} from '../../../../common/deepCopy';
import {IratDto} from '../iratdto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ModalService} from '../../../../common/modal/modal.service';
import {IrattipusListComponent} from '../../../../01 Torzsadatok/01 Irattipus/irattipus-list/irattipus-list.component';
import {UgyfelListComponent} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfel-list/ugyfel-list.component';
import {NumberResult} from '../../../../common/dtos/numberresult';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-irat-szerkesztes',
  templateUrl: './irat-szerkesztes.component.html'
})
export class IratSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_iratszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_iratszerk';
  bodyclass = '';

  @Input() uj = false;
  DtoEdited = new IratDto();
  @Input() set DtoOriginal(value: IratDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() enUgyfel = true;
  @Input() Ugyfelkod: number;
  @Output() eventOk = new EventEmitter<IratDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  iratservice: IratService;

  constructor(private _irattipusservice: IrattipusService,
              private _ugyfelservice: UgyfelService,
              private _errorservice: ErrorService,
              private _modalservice: ModalService,
              private _cdr: ChangeDetectorRef,
              private _fb: FormBuilder,
              iratservice: IratService) {
    super();

    this.iratservice = iratservice;

    this.form = this._fb.group({
      'irany': ['', [Validators.required]],
      'keletkezett': ['', [Validators.required]],
      'irattipus': ['', [Validators.required, Validators.maxLength(30)]],
      'targy': ['', [Validators.maxLength(200)]],
    });
  }

  async ngOnInit() {
    if (this.enUgyfel) {
      this.form.addControl('ugyfelnev', new FormControl('', [Validators.required, Validators.maxLength(200)]));
      this.form.addControl('ugyfelcim', new FormControl({value: '', disabled: true}, []));
      this.form.addControl('kuldo', new FormControl('', [Validators.maxLength(100)]));
    }

    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.iratservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.DtoEdited.Ugyfelkod = this.Ugyfelkod;
        this.updateform();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['irany'].setValue(this.DtoEdited.Irany);

    const formKeletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    this.form.controls['keletkezett'].setValue(formKeletkezett);

    this.form.controls['irattipus'].setValue(this.DtoEdited.Irattipus);
    this.form.controls['targy'].setValue(this.DtoEdited.Targy);

    if (this.enUgyfel) {
      this.form.controls['ugyfelnev'].setValue(this.DtoEdited.Ugyfelnev);
      this.form.controls['ugyfelcim'].setValue(this.DtoEdited.Ugyfelcim);
      this.form.controls['kuldo'].setValue(this.DtoEdited.Kuldo);
    }
  }
  updatedto() {
    this.DtoEdited.Irany = this.form.value['irany'];

    const dtoKeletkezett = moment(this.form.value['keletkezett']).toISOString(true);
    this.DtoEdited.Keletkezett = dtoKeletkezett;

    this.DtoEdited.Irattipus = this.form.value['irattipus'];
    this.DtoEdited.Targy = this.form.value['targy'];

    if (this.enUgyfel) {
      this.DtoEdited.Ugyfelnev = this.form.value['ugyfelnev'];
      this.DtoEdited.Ugyfelcim = this.form.value['ugyfelcim'];
      this.DtoEdited.Kuldo = this.form.value['kuldo'];
    }
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._irattipusservice.ZoomCheck(new IrattipusZoomParam(this.DtoEdited.Irattipuskod,
        this.DtoEdited.Irattipus));
      if (res.Error != null) {
        throw res.Error;
      }

      if (this.DtoEdited.Ugyfelnev || '' !== '') {
        const res1 = await this._ugyfelservice.ZoomCheck(new UgyfelZoomParam(this.DtoEdited.Ugyfelkod,
          this.DtoEdited.Ugyfelnev));
        if (res1.Error != null) {
          throw res1.Error;
        }
      }

      let res2: NumberResult;
      if (this.uj) {
        res2 = await this.iratservice.Add(this.DtoEdited);
      } else {
        res2 = await this.iratservice.Update(this.DtoEdited);
      }
      if (res2.Error != null) {
        throw res2.Error;
      }

      const res3 = await this.iratservice.Get(res2.Result);
      if (res3.Error != null) {
        throw res3.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res3.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventMegsem.emit();
  }

  IrattipusZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(IrattipusListComponent);
    C.instance.maszk = this.DtoEdited.Irattipus || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Irattipuskod = dto.Irattipuskod;
      this.DtoEdited.Irattipus = dto.Irattipus1;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }


  UgyfelZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(UgyfelListComponent);
    C.instance.maszk = this.DtoEdited.Ugyfelnev || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Ugyfelkod = dto.Ugyfelkod;
      this.DtoEdited.Ugyfelnev = dto.Nev;
      this.DtoEdited.Ugyfelcim = dto.Cim;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-complex';
    this._modalservice.open(this.modalname);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
