import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektContainerMode} from '../projektcontainermode';
import {ProjektEgyMode} from '../projektegymode';

@Component({
  selector: 'app-projekt-torles',
  templateUrl: './projekt-torles.component.html',
  styleUrls: ['./projekt-torles.component.css']
})
export class ProjektTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  ok() {
    this.eppFrissit = true;
    this.projektservice.Delete(this.projektservice.Dto[this.projektservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektservice.Dto.splice(this.projektservice.DtoSelectedIndex, 1);
        this.projektservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.projektservice.ContainerMode = ProjektContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.projektservice.EgyMode = ProjektEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
