import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {BizonylatMintaAlapjanParam} from '../bizonylatmintaalapjan';
import {ErrorService} from '../../../common/errorbox/error.service';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-errol',
  templateUrl: './bizonylat-errol.component.html'
})
export class BizonylatErrolComponent implements OnInit, OnDestroy {
  @Input() Bizonylatkod = -1;
  @Output() eventBizonylaterrolUtan = new EventEmitter<boolean>();

  entryindex = 4;
  kesz = false;
  ujbizonylatkod = 0;

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
              private _logonservice: LogonService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'bizonylattipusok': [0, [Validators.required]]
    });
  }

  ngOnInit() {
    for (let i = 0; i < this.bizonylatservice.tipusok.length; i++) {
      this.bizonylatservice.tipusok[i][2] = !this._logonservice.Jogaim.includes(this.bizonylatservice.tipusok[i][3]);
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylattipusok'].setValue(this.entryindex);
  }
  updatedto() {
    this.entryindex = this.form.value['bizonylattipusok'];
  }

  async onSubmit() {
    if (!this.kesz) {
      this.updatedto();

      this.spinner = true;
      try {
        const res = await this.bizonylatservice.UjBizonylatMintaAlapjan(new BizonylatMintaAlapjanParam(
          this.Bizonylatkod, this.bizonylatservice.tipusok[this.entryindex][1]));
        if (res.Error != null) {
          throw res.Error;
        }

        this.ujbizonylatkod = res.Result;
        this.kesz = true;
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.eventBizonylaterrolUtan.emit(true);
    }
  }

  onCancel() {
    this.eventBizonylaterrolUtan.emit(false);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
