import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CikkService} from '../cikk.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {CikkMozgasParameter} from '../cikkmozgasparameter';
import {CikkContainerMode} from '../cikkcontainermode';
import {CikkEgyMode} from '../cikkegymode';
import {CikkSzerkesztesMode} from '../cikkszerkesztesmode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-cikk-egy',
  templateUrl: './cikk-egy.component.html',
  styleUrls: ['./cikk-egy.component.css'],
  animations: [rowanimation]
})
export class CikkEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  cikkservice: CikkService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              cikkservice: CikkService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.CIKKMOD]);
    this.cikkservice = cikkservice;
  }

  vissza() {
    this.cikkservice.ContainerMode = CikkContainerMode.List;
  }
  reszletek() {
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }
  torles () {
    this.cikkservice.EgyMode = CikkEgyMode.Torles;
  }
  modositas() {
    this.cikkservice.uj = false;
    this.cikkservice.DtoEdited = Object.assign({}, this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex]);
    this.cikkservice.EgyMode = CikkEgyMode.Modositas;
    this.cikkservice.SzerkesztesMode = CikkSzerkesztesMode.Blank;
  }
  beszerzes() {
    this.cikkservice.BizonylattipusKod = 3;
    this.beszerzeskivet();
  }
  kivet() {
    this.cikkservice.BizonylattipusKod = 2;
    this.beszerzeskivet();
  }
  beszerzeskivet() {
    this.eppFrissit = true;
    this.cikkservice.Mozgas(new CikkMozgasParameter(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex].Cikkkod,
      this.cikkservice.BizonylattipusKod))
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.MozgasDto = res.Result;

        this.eppFrissit = false;
        this.cikkservice.EgyMode = CikkEgyMode.BeszerzesKivet;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.cikkservice.Delete(this.cikkservice.Dto[this.cikkservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.cikkservice.Dto.splice(this.cikkservice.DtoSelectedIndex, 1);
        this.cikkservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.cikkservice.ContainerMode = CikkContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.cikkservice.EgyMode = CikkEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
