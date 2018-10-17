import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {HelysegService} from '../helyseg.service';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';

@Component({
  selector: 'app-helyseg-torles',
  templateUrl: './helyseg-torles.component.html',
  styleUrls: ['./helyseg-torles.component.css']
})
export class HelysegTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  eppFrissit = false;

  constructor(irattipusservice: HelysegService) {
    this.helysegservice = irattipusservice;
  }

  ok() {
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
  cancel() {
    this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
