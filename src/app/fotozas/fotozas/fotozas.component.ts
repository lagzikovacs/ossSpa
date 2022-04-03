import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FotozasService} from '../fotozas.service';
import {FotozasDto} from '../fotozasdto';
import {FajlBuf} from '../../dokumentum/fajlbuf';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {LogonService} from '../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fotozas',
  templateUrl: './fotozas.component.html'
})
export class FotozasComponent implements OnInit, OnDestroy {
  // dinamikusan keresi a konténerben
  @ViewChild('fileInput') fileInput: ElementRef;

  fp: string;
  private _sub: any;
  bejelentkezve = false;
  Dto = new FotozasDto();

  fb: any;

  form: FormGroup;
  eppFrissit = false;

  constructor(private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _dokumentumservice: DokumentumService,
              private _fotozasservice: FotozasService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder) {

    this.form = this._fb.group({
      'fajlnev': [{value: '', disabled: true}, []],
      'megjegyzes': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.fp = params['fp'] || '';

        this.folytatas();
      });
  }

  folytatas() {
    this.eppFrissit = true;
    this._fotozasservice.Check(this.fp)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this._logonservice.Sid = this.Dto.sid;
        this.Dto.dokumentumDto.reverse();

        this.bejelentkezve = true;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      this.form.controls['fajlnev'].setValue(file.name);

      reader.readAsDataURL(file);
      reader.onload = () => {
        const file64 = (reader.result as string).split(',')[1];

        this.fb = new FajlBuf();
        this.fb.b = file64;
        this.fb.Fajlnev = file.name;
        this.fb.Meret = file.size;
        this.fb.IratKod = this.Dto.iratDto[0].Iratkod;
      };
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this.fb.Megjegyzes = this.form.value['megjegyzes'];

    this._dokumentumservice.FeltoltesAngular(this.fb)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        delete this.fb;
        this.form.controls['fajlnev'].setValue('');
        this.form.controls['megjegyzes'].setValue('');

        this.eppFrissit = false;

        this.folytatas();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
