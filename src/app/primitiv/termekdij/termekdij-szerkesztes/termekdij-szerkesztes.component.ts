import {Component, OnDestroy} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {TermekdijEgyMode} from '../termekdijegymode';
import {NumberResult} from '../../../dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';

@Component({
  selector: 'app-termekdij-szerkesztes',
  templateUrl: './termekdij-szerkesztes.component.html'
})
export class TermekdijSzerkesztesComponent implements OnDestroy {
  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(termekdijservice: TermekdijService,
              private _errorservice: ErrorService) {
    this.termekdijservice = termekdijservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.termekdijservice.uj) {
      p = this.termekdijservice.Add(this.termekdijservice.DtoEdited);
    } else {
      p = this.termekdijservice.Update(this.termekdijservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.termekdijservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.termekdijservice.uj) {
          this.termekdijservice.Dto.unshift(res1.Result[0]);
        } else {
          this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.termekdijservice.uj) {
      this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
    } else {
      this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
