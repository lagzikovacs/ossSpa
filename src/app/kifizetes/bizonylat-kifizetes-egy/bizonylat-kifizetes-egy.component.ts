import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {BizonylatKifizetesContainerMode} from '../bizonylatkifizetescontainermode';
import {BizonylatKifizetesEgyMode} from '../bizonylatkifizetesegymode';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-bizonylat-kifizetes-egy',
  templateUrl: './bizonylat-kifizetes-egy.component.html',
  animations: [rowanimation]
})
export class BizonylatKifizetesEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;
  ri = -1;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  vissza() {
    this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
  }
  reszletek() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  }
  torles() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Torles;
  }
  modositas() {
    this.bizonylatkifizetesservice.uj = false;
    this.bizonylatkifizetesservice.DtoEdited =
      Object.assign({}, this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex]);
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Modositas;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.bizonylatkifizetesservice.Delete(this.bizonylatkifizetesservice.Dto[this.bizonylatkifizetesservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatkifizetesservice.Dto.splice(this.bizonylatkifizetesservice.DtoSelectedIndex, 1);
        this.bizonylatkifizetesservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.bizonylatkifizetesservice.ContainerMode = BizonylatKifizetesContainerMode.List;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  TorlesCancel() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
