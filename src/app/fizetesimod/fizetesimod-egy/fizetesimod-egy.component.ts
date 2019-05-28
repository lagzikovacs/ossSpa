import {Component, OnDestroy, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {FizetesimodContainerMode} from '../fizetesimodcontainermode';
import {FizetesimodEgyMode} from '../fizetesimodegymode';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-fizetesimod-egy',
  templateUrl: './fizetesimod-egy.component.html',
  styleUrls: ['./fizetesimod-egy.component.css'],
  animations: [rowanimation]
})
export class FizetesimodEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  mod = false;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              fizetesimodservice: FizetesimodService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.fizetesimodservice = fizetesimodservice;
  }

  vissza() {
    this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
  }
  reszletek() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }
  torles () {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Torles;
  }
  modositas() {
    this.fizetesimodservice.uj = false;
    this.fizetesimodservice.DtoEdited = Object.assign({}, this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex]);
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.fizetesimodservice.Delete(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.fizetesimodservice.Dto.splice(this.fizetesimodservice.DtoSelectedIndex, 1);
        this.fizetesimodservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.fizetesimodservice.EgyMode = FizetesimodEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
