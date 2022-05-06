import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatKibocsatasParam} from '../bizonylatkibocsatasparam';
import {BizonylatTipus} from '../bizonylattipus';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-kibocsatas',
  templateUrl: './bizonylat-kibocsatas.component.html'
})
export class BizonylatKibocsatasComponent implements OnInit, OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventKibocsatasUtan = new EventEmitter<BizonylatDto>();
  @Output() eventKibocsatasUtanKeszpenzes = new EventEmitter<boolean>();

  vbizonylatszam = '';
  private _keszpenzes = false;

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
    });
  }

  ngOnInit() {
    if (!this.bizonylatLeiro.GenBizonylatszam) {
      this.form.addControl('bizonylatszam', new FormControl('', [Validators.required]));
    }

    this.updateform();
  }

  updateform() {
    if (!this.bizonylatLeiro.GenBizonylatszam) {
      this.form.controls['bizonylatszam'].setValue(this.vbizonylatszam);
    }
  }
  updatedto() {
    if (!this.bizonylatLeiro.GenBizonylatszam) {
      this.vbizonylatszam = this.form.value['bizonylatszam'];
    }
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.bizonylatservice.Kibocsatas(new BizonylatKibocsatasParam(this.Dto, this.vbizonylatszam));
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.bizonylatservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventKibocsatasUtan.emit(res1.Result[0]);

      this._keszpenzes = (this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
        this.bizonylatTipus === BizonylatTipus.ElolegSzamla ||
        this.bizonylatTipus === BizonylatTipus.Szamla) &&
        this.Dto.Fizetesimod === 'Készpénz';

      this.eventKibocsatasUtanKeszpenzes.emit(this._keszpenzes);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  cancel() {
    this.eventKibocsatasUtan.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
