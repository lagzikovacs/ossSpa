import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BizonylatnyomtatasService} from '../bizonylatnyomtatas.service';
import {SzMT} from '../../common/dtos/szmt';
import {Szempont} from '../../common/enums/szempont';
import {BizonylatNyomtatasTipus} from '../bizonylatnyomtatastipus';
import {ErrorService} from '../../common/errorbox/error.service';
import {Bizonylatnyomtatasciklus} from '../bizonylatnyomtatasciklus';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
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

  constructor(private _bizonylatservice: BizonylatService,
              private _fb: FormBuilder,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _errorservice: ErrorService) {

    this.form = this._fb.group({
      'nyomtatastipus': [0, [Validators.required]]
    });

    this.bc = new Bizonylatnyomtatasciklus(_errorservice, _bizonylatnyomtatasservice);
    this.bc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
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

  onSubmit() {
    this.eppFrissit = true;
    this.bc.megszakitani = false;
    this.bc.fajlnev = '';
    this.updatedto();

    const fi = [
      new SzMT(Szempont.BizonylatKod, this.Bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, this.entriest[this.selectedi])
    ];
    console.log(fi);
    this._bizonylatservice.Get(this.Bizonylatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bc.fajlnev = res.Result[0].Bizonylatszam + ' ';
        return this._bizonylatservice.BizonylatLeiro(res.Result[0].Bizonylattipuskod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.bc.fajlnev += res1.Result.BizonylatNev + '.pdf';
        return this._bizonylatnyomtatasservice.TaskStart(fi);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.bc.tasktoken = res2.Result;
        this.bc.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
