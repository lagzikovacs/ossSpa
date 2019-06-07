import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {IrattipusService} from '../irattipus.service';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {IrattipusEgyMode} from '../irattipusegymode';
import {IrattipusContainerMode} from '../irattipuscontainermode';
import {rowanimation} from '../../../animation/rowAnimation';
import {deepCopy} from '../../../tools/deepCopy';

@Component({
  selector: 'app-irattipus-egy',
  templateUrl: './irattipus-egy.component.html',
  animations: [rowanimation]
})
export class IrattipusEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              irattipusservice: IrattipusService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.irattipusservice = irattipusservice;
  }

  vissza() {
    this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
  }
  reszletek() {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }
  torles () {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Torles;
  }
  modositas() {
    this.irattipusservice.uj = false;
    this.irattipusservice.DtoEdited = deepCopy(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex]);
    this.irattipusservice.EgyMode = IrattipusEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.irattipusservice.Delete(this.irattipusservice.Dto[this.irattipusservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.irattipusservice.Dto.splice(this.irattipusservice.DtoSelectedIndex, 1);
        this.irattipusservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.irattipusservice.ContainerMode = IrattipusContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.irattipusservice.EgyMode = IrattipusEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
