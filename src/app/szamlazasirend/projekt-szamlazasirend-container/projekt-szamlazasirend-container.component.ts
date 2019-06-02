import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-projekt-szamlazasirend-container',
  templateUrl: './projekt-szamlazasirend-container.component.html',
  styleUrls: ['./projekt-szamlazasirend-container.component.css'],
  animations: [rowanimation]
})
export class ProjektSzamlazasirendContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szamlazasirendservice: SzamlazasirendService;
  eppFrissit = false;

  constructor(szamlazasirendservice: SzamlazasirendService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  ngOnInit() {
    if (this.szamlazasirendservice.GridSettings === undefined || this.szamlazasirendservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.szamlazasirendservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.szamlazasirendservice.GridSettings = res.Result;

          return this.szamlazasirendservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.szamlazasirendservice.ReszletekSettings = res1.Result;

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
