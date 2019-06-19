import {Component, OnDestroy} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-projektkapcsolat-levalasztas',
  templateUrl: './projektkapcsolat-levalasztas.component.html'
})
export class ProjektkapcsolatLevalasztasComponent implements OnDestroy {
  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(projektkapcsolatservice: ProjektkapcsolatService,
              private _errorservice: ErrorService) {
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
