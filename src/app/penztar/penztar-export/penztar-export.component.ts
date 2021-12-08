import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {RiportService} from '../../riport/riport.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Riportciklus} from '../../riport/riportciklus';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-penztar-export',
  templateUrl: './penztar-export.component.html'
})
export class PenztarExportComponent implements OnInit, OnDestroy {
  rc: Riportciklus;
  @Input() Penztarkod = -1;

  vtol = '2021-01-01';
  vig = '2021-12-31';

  form: FormGroup;
  eppFrissit = false;

  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              riportservice: RiportService) {
    this.riportservice = riportservice;

    this.form = this._fb.group({
      'tol': ['', [Validators.required]],
      'ig': ['', [Validators.required]]
    });

    this.rc = new Riportciklus(_errorservice, riportservice, 'Pénztártétel.xls');
    this.rc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
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

  onSubmit() {
    this.eppFrissit = true;
    this.rc.megszakitani = false;
    this.updatedto();

    const fi = [
      new SzMT(Szempont.Null, this.Penztarkod.toString()),
      new SzMT(Szempont.Null, moment(this.vtol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.vig).toISOString(true))
    ];

    this.riportservice.PenztarTetelTaskStart(fi)
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
