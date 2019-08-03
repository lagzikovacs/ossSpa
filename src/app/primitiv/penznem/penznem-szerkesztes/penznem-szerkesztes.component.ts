import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {PenznemDto} from '../penznemdto';

@Component({
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html'
})
export class PenznemSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new PenznemDto();
  @Input() set DtoOriginal(value: PenznemDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<PenznemDto>();

  eppFrissit = false;

  penznemservice: PenznemService;

  constructor(private _errorservice: ErrorService,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.penznemservice.CreateNew()
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
      p = this.penznemservice.Add(this.DtoEdited);
    } else {
      p = this.penznemservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.penznemservice.Get(res.Result);
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
