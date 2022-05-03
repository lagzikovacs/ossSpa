import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BizonylatnyomtatasService} from '../bizonylatnyomtatas.service';
import {SzMT} from '../../../common/dtos/szmt';
import {Szempont} from '../../../common/enums/szempont';
import {BizonylatNyomtatasTipus} from '../bizonylatnyomtatastipus';
import {ErrorService} from '../../../common/errorbox/error.service';
import {Bizonylatnyomtatasciklus} from '../bizonylatnyomtatasciklus';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BizonylatService} from "../../../bizonylat/bizonylat.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-nyomtatas',
  templateUrl: './bizonylat-nyomtatas.component.html'
})
export class BizonylatNyomtatasComponent implements OnInit, OnDestroy {
  bc: Bizonylatnyomtatasciklus;

  @Input() Bizonylatkod = -1;

  entries = ['Minta', 'Eredeti', 'Másolat'];
  entriest = [BizonylatNyomtatasTipus.Minta, BizonylatNyomtatasTipus.Eredeti, BizonylatNyomtatasTipus.Masolat];
  selectedi = 0;

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _bizonylatservice: BizonylatService,
              private _fb: FormBuilder,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _cdr: ChangeDetectorRef,
              private _errorservice: ErrorService) {

    this.form = this._fb.group({
      'nyomtatastipus': [0, [Validators.required]]
    });

    this.bc = new Bizonylatnyomtatasciklus(_errorservice, _bizonylatnyomtatasservice);
    this.bc.eventSpinnervege.on(() => {
      this.spinner = false;
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['nyomtatastipus'].setValue(this.selectedi);
  }
  updatedto() {
    this.selectedi = this.form.value['nyomtatastipus'];
  }

  async onSubmit() {
    this.bc.megszakitani = false;
    this.bc.fajlnev = '';
    this.updatedto();

    const fi = [
      new SzMT(Szempont.BizonylatKod, this.Bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, this.entriest[this.selectedi])
    ];

    this.spinner = true;
    try {
      const res = await this._bizonylatservice.Get(this.Bizonylatkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.bc.fajlnev = res.Result[0].Bizonylatszam + ' ';

      const res1 = await this._bizonylatservice.BizonylatLeiro(res.Result[0].Bizonylattipuskod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.bc.fajlnev += res1.Result.BizonylatNev + '.pdf';

      const res2 = await this._bizonylatnyomtatasservice.TaskStart(fi);
      if (res2.Error != null) {
        throw res2.Error;
      }

      this.bc.tasktoken = res2.Result;
      this.bc.ciklus();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.bc.megszakitani = true;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
