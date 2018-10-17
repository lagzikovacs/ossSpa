import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektteendoService} from '../projektteendo.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {ProjektteendoContainerMode} from '../projektteendocontainermode';
import {ProjektteendoEgyMode} from '../projekttendoegymode';

@Component({
  selector: 'app-projekt-teendo-torles',
  templateUrl: './projekt-teendo-torles.component.html',
  styleUrls: ['./projekt-teendo-torles.component.css']
})
export class ProjektTeendoTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektteendoservice: ProjektteendoService;
  eppFrissit = false;

  constructor(projektteendoservice: ProjektteendoService) {
    this.projektteendoservice = projektteendoservice;
  }

  ok() {
    this.eppFrissit = true;
    this.projektteendoservice.Delete(this.projektteendoservice.Dto[this.projektteendoservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektteendoservice.Dto.splice(this.projektteendoservice.DtoSelectedIndex, 1);
        this.projektteendoservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.projektteendoservice.ContainerMode = ProjektteendoContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.projektteendoservice.EgyMode = ProjektteendoEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
