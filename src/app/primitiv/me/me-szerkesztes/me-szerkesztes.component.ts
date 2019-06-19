import {Component, OnDestroy} from '@angular/core';
import {MeService} from '../me.service';
import {NumberResult} from '../../../dtos/numberresult';
import {MeContainerMode} from '../mecontainermode';
import {MeEgyMode} from '../meegymode';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-me-szerkesztes',
  templateUrl: './me-szerkesztes.component.html'
})
export class MeSzerkesztesComponent implements OnDestroy {
  meservice: MeService;
  eppFrissit = false;

  constructor(meservice: MeService,
              private _errorservice: ErrorService) {
    this.meservice = meservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.meservice.uj) {
      p = this.meservice.Add(this.meservice.DtoEdited);
    } else {
      p = this.meservice.Update(this.meservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.meservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.meservice.uj) {
          this.meservice.Dto.unshift(res1.Result[0]);
        } else {
          this.meservice.Dto[this.meservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.meservice.uj) {
      this.meservice.ContainerMode = MeContainerMode.List;
    } else {
      this.meservice.EgyMode = MeEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
