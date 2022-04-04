import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {FajlBuf} from '../fajlbuf';
import {ErrorService} from '../../common/errorbox/error.service';
import {DokumentumDto} from '../dokumentumdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dokumentum-feltoltes',
  templateUrl: './dokumentum-feltoltes.component.html'
})
export class DokumentumFeltoltesComponent implements OnDestroy {
  @Input() Iratkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<DokumentumDto>();

  fb: any;

  form: FormGroup;
  eppFrissit = false;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;

    this.form = this._fb.group({
      'fajlnev': [{value: '', disabled: true}, []],
      'megjegyzes': ['', []]
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
        this.fb.IratKod = this.Iratkod;
      };
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this.fb.Megjegyzes = this.form.value['megjegyzes'];

    this.dokumentumservice.FeltoltesAngular(this.fb)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.dokumentumservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
