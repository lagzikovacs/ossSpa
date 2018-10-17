import {Component, OnDestroy, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {SzamlazasirendContainerMode} from '../szamlazasirendcontainermode';
import {SzamlazasirendEgyMode} from '../szamlazasirendegymode';

@Component({
  selector: 'app-projekt-szamlazasirend-torles',
  templateUrl: './projekt-szamlazasirend-torles.component.html',
  styleUrls: ['./projekt-szamlazasirend-torles.component.css']
})
export class ProjektSzamlazasirendTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(cikkservice: SzamlazasirendService) {
    this.szamlazasirendservice = cikkservice;
  }

  ok() {
    this.eppFrissit = true;
    this.szamlazasirendservice.Delete(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.szamlazasirendservice.Dto.splice(this.szamlazasirendservice.DtoSelectedIndex, 1);
        this.szamlazasirendservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.szamlazasirendservice.ContainerMode = SzamlazasirendContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  cancel() {
    this.szamlazasirendservice.EgyMode = SzamlazasirendEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
