import {Component, OnDestroy} from '@angular/core';
import {TeendoService} from '../teendo.service';
import {NumberResult} from '../../../dtos/numberresult';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-teendo-szerkesztes',
  templateUrl: './teendo-szerkesztes.component.html'
})
export class TeendoSzerkesztesComponent implements OnDestroy {
  teendoservice: TeendoService;
  eppFrissit = false;

  constructor(teendoservice: TeendoService,
              private _errorservice: ErrorService) {
    this.teendoservice = teendoservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.teendoservice.uj) {
      p = this.teendoservice.Add(this.teendoservice.DtoEdited);
    } else {
      p = this.teendoservice.Update(this.teendoservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.teendoservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.teendoservice.uj) {
          this.teendoservice.Dto.unshift(res1.Result[0]);
        } else {
          this.teendoservice.Dto[this.teendoservice.DtoSelectedIndex] = res1.Result[0];
        }

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    if (this.teendoservice.uj) {
      this.teendoservice.ContainerMode = TeendoContainerMode.List;
    } else {
      this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
