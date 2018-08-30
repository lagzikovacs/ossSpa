import {Component, ViewChild} from '@angular/core';
import {NumberResult} from '../../dtos/numberresult';
import {TermekdijService} from '../termekdij.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {TermekdijEgyMode} from '../termekdijegymode';

@Component({
  selector: 'app-termekdij-szerkesztes',
  templateUrl: './termekdij-szerkesztes.component.html',
  styleUrls: ['./termekdij-szerkesztes.component.css']
})
export class TermekdijSzerkesztesComponent {
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
}