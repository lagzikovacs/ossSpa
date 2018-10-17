import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatKapcsolatContainerMode} from '../bizonylatkapcsolatcontainermode';

@Component({
  selector: 'app-bizonylat-irat-levalasztas',
  templateUrl: './bizonylat-irat-levalasztas.component.html',
  styleUrls: ['./bizonylat-irat-levalasztas.component.css']
})
export class BizonylatIratLevalasztasComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;
  eppFrissit = false;

  constructor(bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.bizonylatkapcsolatservice.Delete(this.bizonylatkapcsolatservice.Dto[this.bizonylatkapcsolatservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatkapcsolatservice.Dto.splice(this.bizonylatkapcsolatservice.DtoSelectedIndex, 1);
        this.bizonylatkapcsolatservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.bizonylatkapcsolatservice.ContainerMode = BizonylatKapcsolatContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
