import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {PenznemService} from '../../../../01 Torzsadatok/03 Penznem/penznem.service';
import {PenznemZoomParam} from '../../../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {PenztarService} from '../penztar.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {deepCopy} from '../../../../common/deepCopy';
import {PenztarDto} from '../penztardto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NumberResult} from '../../../../common/dtos/numberresult';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {PenznemListComponent} from '../../../../01 Torzsadatok/03 Penznem/penznem-list/penznem-list.component';
import {ModalService} from '../../../../common/modal/modal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztar-szerkesztes',
  templateUrl: './penztar-szerkesztes.component.html'
})
export class PenztarSzerkesztesComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_penztarszerk', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_penztarszerk';
  bodyclass = '';

  @Input() uj = false;
  DtoEdited = new PenztarDto();
  @Input() set DtoOriginal(value: PenztarDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<PenztarDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  penztarservice: PenztarService;

  constructor(private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _modalservice: ModalService,
              penztarservice: PenztarService) {
    super();

    this.penztarservice = penztarservice;

    this.form = this._fb.group({
      'penztar': ['', [Validators.required, Validators.maxLength(30)]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.penztarservice.CreateNew();
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
    this.form.controls['penztar'].setValue(this.DtoEdited.Penztar1);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
  }
  updatedto() {
    this.DtoEdited.Penztar1 = this.form.value['penztar'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod || 0,
        this.DtoEdited.Penznem || ''));
      if (res.Error !== null) {
        throw res.Error;
      }

      let res1: NumberResult;
      if (this.uj) {
        res1 = await this.penztarservice.Add(this.DtoEdited);
      } else {
        res1 = await this.penztarservice.Update(this.DtoEdited);
      }
      if (res1.Error !== null) {
        throw res1.Error;
      }

      const res2 = await this.penztarservice.Get(res1.Result);
      if (res2.Error !== null) {
        throw res2.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res2.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
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
