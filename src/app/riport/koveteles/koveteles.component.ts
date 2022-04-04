import {Component, OnDestroy, OnInit} from '@angular/core';
import {RiportService} from '../../04 Riportok/riport.service';
import {Szempont} from '../../common/enums/szempont';
import {SzMT} from '../../common/dtos/szmt';
import * as moment from 'moment';
import {ErrorService} from '../../common/errorbox/error.service';
import {Riportciklus} from '../../04 Riportok/riportciklus';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-koveteles',
  templateUrl: './koveteles.component.html'
})
export class KovetelesComponent implements OnInit, OnDestroy {
  rc: Riportciklus;

  vdatum = moment().format('YYYY-MM-DD');

  form: FormGroup;
  eppFrissit = false;

  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              riportservice: RiportService) {
    this.riportservice = riportservice;

    this.form = this._fb.group({
      'datum': ['', [Validators.required]]
    });

    this.rc = new Riportciklus(_errorservice, riportservice, 'Követelés.xls');
    this.rc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['datum'].setValue(this.vdatum);
  }
  updatedto() {
    this.vdatum = this.form.value['datum'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.rc.megszakitani = false;
    this.updatedto();

    const fi = [
      new SzMT(Szempont.Null, moment(this.vdatum).toISOString(true))
    ];
    this.riportservice.KovetelesekTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.rc.tasktoken = res.Result;
        this.rc.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
