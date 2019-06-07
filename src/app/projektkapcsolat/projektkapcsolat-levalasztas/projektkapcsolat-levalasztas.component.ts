import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';

@Component({
  selector: 'app-projektkapcsolat-levalasztas',
  templateUrl: './projektkapcsolat-levalasztas.component.html'
})
export class ProjektkapcsolatLevalasztasComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ok() {
    this.eppFrissit = true;
    this.projektkapcsolatservice.Delete(this.projektkapcsolatservice.Dto[this.projektkapcsolatservice.DtoSelectedIndex].Projektkapcsolatkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.projektkapcsolatservice.Dto.splice(this.projektkapcsolatservice.DtoSelectedIndex, 1);
        this.projektkapcsolatservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
