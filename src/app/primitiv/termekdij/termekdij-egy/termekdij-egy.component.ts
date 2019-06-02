import {Component, OnDestroy, ViewChild} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {LogonService} from '../../../logon/logon.service';
import {JogKod} from '../../../enums/jogkod';
import {TermekdijContainerMode} from '../termekdijcontainermode';
import {TermekdijEgyMode} from '../termekdijegymode';
import {rowanimation} from '../../../animation/rowAnimation';

@Component({
  selector: 'app-termekdij-egy',
  templateUrl: './termekdij-egy.component.html',
  styleUrls: ['./termekdij-egy.component.css'],
  animations: [rowanimation]
})
export class TermekdijEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  mod = false;
  eppFrissit = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              termekdijservice: TermekdijService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.termekdijservice = termekdijservice;
  }

  vissza() {
    this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
  }
  reszletek() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }
  torles () {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Torles;
  }
  modositas() {
    this.termekdijservice.uj = false;
    this.termekdijservice.DtoEdited = Object.assign({}, this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex]);
    this.termekdijservice.EgyMode = TermekdijEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.termekdijservice.Delete(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.termekdijservice.Dto.splice(this.termekdijservice.DtoSelectedIndex, 1);
        this.termekdijservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.termekdijservice.ContainerMode = TermekdijContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.termekdijservice.EgyMode = TermekdijEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
