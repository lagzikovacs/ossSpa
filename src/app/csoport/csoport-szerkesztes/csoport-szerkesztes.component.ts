import {Component, OnDestroy} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {NumberResult} from '../../dtos/numberresult';
import {CsoportContainerMode} from '../csoportcontainermode';
import {CsoportEgyMode} from '../csoportegymode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-csoport-szerkesztes',
  templateUrl: './csoport-szerkesztes.component.html'
})
export class CsoportSzerkesztesComponent implements OnDestroy {

  csoportservice: CsoportService;
  eppFrissit = false;

  constructor(csoportservice: CsoportService,
              private _errorservice: ErrorService) {
    this.csoportservice = csoportservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.csoportservice.uj) {
      p = this.csoportservice.Add(this.csoportservice.DtoEdited);
    } else {
      p = this.csoportservice.Update(this.csoportservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.csoportservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.csoportservice.uj) {
          this.csoportservice.Dto.unshift(res1.Result[0]);
        } else {
          this.csoportservice.Dto[this.csoportservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.csoportservice.uj) {
      this.csoportservice.ContainerMode = CsoportContainerMode.List;
    } else {
      this.csoportservice.EgyMode = CsoportEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
