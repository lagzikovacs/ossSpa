import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {TevekenysegDto} from '../tevekenysegdto';
import {TevekenysegService} from '../tevekenyseg.service';

@Component({
  selector: 'app-tevekenyseg-szerkesztes',
  templateUrl: './tevekenyseg-szerkesztes.component.html'
})
export class TevekenysegSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new TevekenysegDto();
  @Input() set DtoOriginal(value: TevekenysegDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<TevekenysegDto>();

  eppFrissit = false;

  tevekenysegservice: TevekenysegService;

  constructor(private _errorservice: ErrorService,
              tevekenysegservice: TevekenysegService) {
    this.tevekenysegservice = tevekenysegservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.tevekenysegservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.uj) {
      p = this.tevekenysegservice.Add(this.DtoEdited);
    } else {
      p = this.tevekenysegservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.tevekenysegservice.Get(res.Result);
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
