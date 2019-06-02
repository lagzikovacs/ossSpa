import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {HelysegService} from '../helyseg.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-helyseg-egy',
  templateUrl: './helyseg-egy.component.html',
  styleUrls: ['./helyseg-egy.component.css'],
  animations: [rowanimation]
})
export class HelysegEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              helysegservice: HelysegService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.helysegservice = helysegservice;
  }

  vissza() {
    this.helysegservice.ContainerMode = HelysegContainerMode.List;
  }
  reszletek() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }
  torles () {
    this.helysegservice.EgyMode = HelysegEgyMode.Torles;
  }
  modositas() {
    this.helysegservice.uj = false;
    this.helysegservice.DtoEdited = Object.assign({}, this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex]);
    this.helysegservice.EgyMode = HelysegEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.helysegservice.Delete(this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.helysegservice.Dto.splice(this.helysegservice.DtoSelectedIndex, 1);
        this.helysegservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.helysegservice.ContainerMode = HelysegContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
