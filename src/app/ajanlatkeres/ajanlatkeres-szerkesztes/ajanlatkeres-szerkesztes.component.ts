import {Component, OnDestroy} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {AjanlatkeresContainerMode} from '../ajanlatkerescontainermode';
import {AjanlatkeresEgyMode} from '../ajanlatkeresegymode';
import {NumberResult} from '../../dtos/numberresult';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-ajanlatkeres-szerkesztes',
  templateUrl: './ajanlatkeres-szerkesztes.component.html'
})
export class AjanlatkeresSzerkesztesComponent implements OnDestroy {
  ajanlatkeresservice: AjanlatkeresService;
  public eppFrissit = false;

  constructor(ajanlatkeresservice: AjanlatkeresService,
              private _errorservice: ErrorService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.ajanlatkeresservice.uj) {
      p = this.ajanlatkeresservice.Add(this.ajanlatkeresservice.DtoEdited);
    } else {
      p = this.ajanlatkeresservice.Update(this.ajanlatkeresservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.ajanlatkeresservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.ajanlatkeresservice.uj) {
          this.ajanlatkeresservice.Dto.unshift(res1.Result[0]);
        } else {
          this.ajanlatkeresservice.Dto[this.ajanlatkeresservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.ajanlatkeresservice.uj) {
      this.ajanlatkeresservice.ContainerMode = AjanlatkeresContainerMode.List;
    } else {
      this.ajanlatkeresservice.EgyMode = AjanlatkeresEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
