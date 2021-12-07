import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatKibocsatasParam} from '../bizonylatkibocsatasparam';
import {BizonylatTipus} from '../bizonylattipus';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatDto} from '../bizonylatdto';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
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

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'bizonylatszam': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylatszam'].setValue(this.vbizonylatszam);
  }
  updatedto() {
    this.vbizonylatszam = this.form.value['bizonylatszam'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();
    this.bizonylatservice.Kibocsatas(new BizonylatKibocsatasParam(this.Dto, this.vbizonylatszam))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.bizonylatservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventKibocsatasUtan.emit(res1.Result[0]);

        this._keszpenzes = (this.bizonylatTipus === BizonylatTipus.BejovoSzamla ||
            this.bizonylatTipus === BizonylatTipus.ElolegSzamla ||
            this.bizonylatTipus === BizonylatTipus.Szamla) &&
            this.Dto.Fizetesimod === 'Készpénz';

        this.eventKibocsatasUtanKeszpenzes.emit(this._keszpenzes);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
