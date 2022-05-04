import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ProjektDto} from '../projektdto';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {deepCopy} from '../../../../common/deepCopy';
import {UgyfelService} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {PenznemService} from '../../../../01 Torzsadatok/03 Penznem/penznem.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {UgyfelZoomParam} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfelzoomparam';
import {PenznemZoomParam} from '../../../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {NumberResult} from '../../../../common/dtos/numberresult';
import {PenznemListComponent} from '../../../../01 Torzsadatok/03 Penznem/penznem-list/penznem-list.component';
import {ModalService} from '../../../../common/modal/modal.service';
import {UgyfelListComponent} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfel-list/ugyfel-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-szerkesztes',
  templateUrl: './projekt-szerkesztes.component.html'
})
export class ProjektSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_projektszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_projektszerk';
  bodyclass = '';

  @Input() uj = false;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<ProjektDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektservice: ProjektService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _modalservice: ModalService,
              projektservice: ProjektService) {
    super();

    this.projektservice = projektservice;

    this.form = this._fb.group({
      'ugyfelnev': ['', [Validators.required, Validators.maxLength(200)]],
      'ugyfelcim': [{value: '', disabled: true}, []],
      'telepitesicim': ['', [Validators.maxLength(200)]],
      'projektjellege': ['', [Validators.maxLength(50)]],
      'var': ['0', [Validators.required]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'keletkezett': ['', []],
      'megrendelve': ['', []],
      'kivhat': ['', []],
      'megjegyzes': ['', []],
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.projektservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
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
    const formKeletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    const formMegrendelve = moment(this.DtoEdited.Megrendelve).format('YYYY-MM-DD');
    const formKivHat = moment(this.DtoEdited.Kivitelezesihatarido).format('YYYY-MM-DD');

    this.form.controls['keletkezett'].setValue(formKeletkezett);
    this.form.controls['megrendelve'].setValue(formMegrendelve);
    this.form.controls['kivhat'].setValue(formKivHat);

    this.form.controls['ugyfelnev'].setValue(this.DtoEdited.Ugyfelnev);
    this.form.controls['ugyfelcim'].setValue(this.DtoEdited.Ugyfelcim);
    this.form.controls['telepitesicim'].setValue(this.DtoEdited.Telepitesicim);
    this.form.controls['projektjellege'].setValue(this.DtoEdited.Projektjellege);
    this.form.controls['var'].setValue(this.DtoEdited.Vallalasiarnetto);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    const dtoKeletkezett = moment(this.form.value['keletkezett']).toISOString(true);
    const dtoMegrendelve = moment(this.form.value['megrendelve']).toISOString(true);
    const dtoKivHat = moment(this.form.value['kivhat']).toISOString(true);

    this.DtoEdited.Keletkezett = dtoKeletkezett;
    this.DtoEdited.Megrendelve = dtoMegrendelve;
    this.DtoEdited.Kivitelezesihatarido = dtoKivHat;

    this.DtoEdited.Ugyfelnev = this.form.value['ugyfelnev'];
    this.DtoEdited.Ugyfelcim = this.form.value['ugyfelcim'];
    this.DtoEdited.Telepitesicim = this.form.value['telepitesicim'];
    this.DtoEdited.Projektjellege = this.form.value['projektjellege'];
    this.DtoEdited.Vallalasiarnetto = this.form.value['var'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._ugyfelservice.ZoomCheck(new UgyfelZoomParam(this.DtoEdited.Ugyfelkod || 0,
        this.DtoEdited.Ugyfelnev || ''));
      if (res.Error !== null) {
        throw res.Error;
      }

      const res1 = await this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod || 0,
        this.DtoEdited.Penznem || ''));
      if (res1.Error !== null) {
        throw res1.Error;
      }

      let res2: NumberResult;
      if (this.uj) {
        res2 = await this.projektservice.Add(this.DtoEdited);
      } else {
        res2 = await this.projektservice.Update(this.DtoEdited);
      }
      if (res2.Error !== null) {
        throw res2.Error;
      }

      const res3 = await this.projektservice.Get(res2.Result);
      if (res3.Error !== null) {
        throw res3.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res3.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  cancel() {
    this.eventSzerkeszteskesz.emit();
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

  PenznemZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(PenznemListComponent);
    C.instance.maszk = this.DtoEdited.Penznem || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.DtoEdited.Penznemkod = dto.Penznemkod;
      this.DtoEdited.Penznem = dto.Penznem1;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this.bodyclass = 'jw-modal-body-primitive';
    this._modalservice.open(this.modalname);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
