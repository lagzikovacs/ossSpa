import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FotozasService} from '../fotozas.service';
import {FotozasDto} from '../fotozasdto';
import {FajlBuf} from '../../dokumentum/fajlbuf';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {LogonService} from '../../logon/logon.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-fotozas',
  templateUrl: './fotozas.component.html'
})
export class FotozasComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  fp: string;
  private _sub: any;
  bejelentkezve = false;
  Dto = new FotozasDto();

  file: any;
  file64: any;
  fajlnev = '';
  megjegyzes = '';

  spinnerservice: SpinnerService;

  constructor(private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _dokumentumservice: DokumentumService,
              private _fotozasservice: FotozasService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService) {
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.fp = params['fp'] || '';
      });
  }

  folytatas() {
    this.spinnerservice.eppFrissit = true;
    this._fotozasservice.Check(this.fp)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this._logonservice.Sid = this.Dto.sid;

        this.bejelentkezve = true;
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fajlnev = this.file.name;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.file64 = (reader.result as string).split(',')[1];
      };
    }
  }

  onSubmit() {
    const fb = new FajlBuf();
    fb.b = this.file64;
    fb.Fajlnev = this.fajlnev;
    fb.Meret = this.file.size;
    fb.Megjegyzes = this.megjegyzes;
    fb.IratKod = this.Dto.iratDto[0].Iratkod;

    this.spinnerservice.eppFrissit = true;
    this._dokumentumservice.FeltoltesAngular(fb)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this._dokumentumservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.Dto.dokumentumDto.unshift(res1.Result[0]);

        this.megjegyzes = '';
        this.fileInput.nativeElement.value = '';

        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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
