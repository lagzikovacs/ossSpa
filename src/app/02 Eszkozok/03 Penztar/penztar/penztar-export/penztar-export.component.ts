import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {SzMT} from '../../../../common/dtos/szmt';
import {Szempont} from '../../../../common/enums/szempont';
import {RiportService} from '../../../../04 Riportok/riport.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {Riportciklus} from '../../../../04 Riportok/riportciklus';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-penztar-export',
  templateUrl: './penztar-export.component.html'
})
export class PenztarExportComponent implements OnInit, OnDestroy {
  rc: Riportciklus;
  @Input() Penztarkod = -1;

  vtol = '2022-01-01';
  vig = '2022-12-31';

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              riportservice: RiportService) {
    this.riportservice = riportservice;

    this.form = this._fb.group({
      'tol': ['', [Validators.required]],
      'ig': ['', [Validators.required]]
    });

    this.rc = new Riportciklus(_errorservice, riportservice, 'Pénztártétel.xls');
    this.rc.eventSpinnervege.on(() => {
      this.spinner = false;
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['tol'].setValue(this.vtol);
    this.form.controls['ig'].setValue(this.vig);
  }
  updatedto() {
    this.vtol = this.form.value['tol'];
    this.vig = this.form.value['ig'];
  }

  async onSubmit() {
    this.rc.megszakitani = false;
    this.updatedto();

    const fi = [
      new SzMT(Szempont.Null, this.Penztarkod.toString()),
      new SzMT(Szempont.Null, moment(this.vtol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.vig).toISOString(true))
    ];

    this.spinner = true;
    try {
      const res = await this.riportservice.PenztarTetelTaskStart(fi);
      if (res.Error != null) {
        throw res.Error;
      }

      this.rc.tasktoken = res.Result;
      this.rc.ciklus();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.rc.megszakitani = true;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}