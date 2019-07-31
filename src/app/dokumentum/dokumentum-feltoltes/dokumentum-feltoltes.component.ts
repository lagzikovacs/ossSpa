import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {FajlBuf} from '../fajlbuf';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {DokumentumDto} from '../dokumentumdto';

@Component({
  selector: 'app-dokumentum-feltoltes',
  templateUrl: './dokumentum-feltoltes.component.html'
})
export class DokumentumFeltoltesComponent implements OnDestroy {
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  file: any;
  file64: any;
  fajlnev = '';
  megjegyzes = '';
  imageSrc: string;

  @Input() Iratkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<DokumentumDto>();

  dokumentumservice: DokumentumService;
  spinnerservice: SpinnerService;

  constructor(private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
    this.spinnerservice = spinnerservice;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fajlnev = this.file.name;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
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
    fb.IratKod = this.Iratkod;

    this.spinnerservice.eppFrissit = true;
    this.dokumentumservice.FeltoltesAngular(fb)
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

        this.spinnerservice.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
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
