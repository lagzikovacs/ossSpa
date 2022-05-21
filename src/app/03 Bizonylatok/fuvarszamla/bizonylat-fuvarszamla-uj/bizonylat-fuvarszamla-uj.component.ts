import {
  Component, OnDestroy, Output, EventEmitter, Input, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef, ViewContainerRef, ViewChild
} from '@angular/core';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';
import {BizonylatZoomParameter} from '../../bizonylat/bizonylatzoomparameter';
import {FuvardijParam} from '../../bizonylat/fuvardijparam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {BizonylatZoomComponent} from "../../bizonylat/bizonylat-zoom/bizonylat-zoom.component";
import {ModalService} from "../../../common/modal/modal.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-fuvarszamla-uj',
  templateUrl: './bizonylat-fuvarszamla-uj.component.html'
})
export class BizonylatFuvarszamlaUjComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  @ViewChild('compcont_bizonylatzoom', {read: ViewContainerRef}) vcr: ViewContainerRef;
  modalname = 'modal_bizonylatzoom';

  @Input() dtoAnyagszamla: BizonylatDto;
  dtoFuvarszamla = new BizonylatDto();
  @Output() eventMegsem = new EventEmitter();
  @Output() eventOK = new EventEmitter<BizonylatDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  Fuvardij: number;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              private _modalservice: ModalService,
              bizonylatservice: BizonylatService) {
    super();

    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'bizonylatszam': ['', [Validators.required, Validators.maxLength(100)]],
      'fuvardij': [0, [Validators.required]],
      'fuvardijpenzneme': [{value: '', disabled: true}, [Validators.required, Validators.maxLength(3)]],
      'fuvardijarfolyama': [{value: 0, disabled: true}, [Validators.required]],
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylatszam'].setValue(this.dtoFuvarszamla.Bizonylatszam);
    this.form.controls['fuvardij'].setValue(this.Fuvardij);
    this.form.controls['fuvardijpenzneme'].setValue(this.dtoFuvarszamla.Penznem);
    this.form.controls['fuvardijarfolyama'].setValue(this.dtoFuvarszamla.Arfolyam);
  }
  updatedto() {
    this.dtoFuvarszamla.Bizonylatszam = this.form.value['bizonylatszam'];
    this.Fuvardij = this.form.value['fuvardij'];
    this.dtoFuvarszamla.Penznem = this.form.value['fuvardijpenzneme'];
    this.dtoFuvarszamla.Arfolyam = this.form.value['fuvardijarfolyama'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const  res = await this.bizonylatservice.ZoomCheck(new BizonylatZoomParameter(this.dtoFuvarszamla.Bizonylatkod || 0,
        this.dtoFuvarszamla.Bizonylatszam || ''));
      if (res.Error !== null) {
        throw res.Error;
      }

      const res1 = await this.bizonylatservice.Fuvardij(new FuvardijParam(this.dtoAnyagszamla, this.dtoFuvarszamla, this.Fuvardij));
      if (res1.Error !== null) {
        throw res1.Error;
      }

      const res2 = await this.bizonylatservice.Get(res1.Result);
      if (res2.Error != null) {
        throw res2.Error;
      }

      this.spinner = false;
      this.eventOK.emit(res2.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doCancel() {
    this.eventMegsem.emit();
  }

  BizonylatZoom() {
    this.updatedto();

    this.vcr.clear();
    const C = this.vcr.createComponent(BizonylatZoomComponent);
    C.instance.maszk = this.dtoFuvarszamla.Bizonylatszam || '';
    C.instance.eventSelectzoom.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.dtoFuvarszamla = dto;
      this.Fuvardij = dto.Netto;
      this.updateform();
    });
    C.instance.eventStopzoom.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcr.clear();
      this._modalservice.close(this.modalname);
    });

    this._modalservice.open(this.modalname);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
