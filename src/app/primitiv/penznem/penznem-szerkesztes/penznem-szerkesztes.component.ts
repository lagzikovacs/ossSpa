import {Component, OnDestroy, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {NumberResult} from '../../../dtos/numberresult';
import {PenznemEgyMode} from '../penznemegymode';
import {PenznemContainerMode} from '../penznemcontainermode';

@Component({
  selector: 'app-penznem-szerkesztes',
  templateUrl: './penznem-szerkesztes.component.html',
  styleUrls: ['./penznem-szerkesztes.component.css']
})
export class PenznemSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.penznemservice.uj) {
      p = this.penznemservice.Add(this.penznemservice.DtoEdited);
    } else {
      p = this.penznemservice.Update(this.penznemservice.DtoEdited);
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

        if (this.penznemservice.uj) {
          this.penznemservice.Dto.unshift(res1.Result[0]);
        } else {
          this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex] = res1.Result[0];
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
    if (this.penznemservice.uj) {
      this.penznemservice.ContainerMode = PenznemContainerMode.List;
    } else {
      this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
