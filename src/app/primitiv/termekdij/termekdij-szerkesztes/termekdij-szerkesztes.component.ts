import {Component, OnDestroy, ViewChild} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {TermekdijEgyMode} from '../termekdijegymode';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {NumberResult} from '../../../dtos/numberresult';

@Component({
  selector: 'app-termekdij-szerkesztes',
  templateUrl: './termekdij-szerkesztes.component.html'
})
export class TermekdijSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(termekdijservice: TermekdijService) {
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
