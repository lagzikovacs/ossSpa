import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {HelysegService} from '../helyseg.service';
import {NumberResult} from '../../dtos/numberresult';
import {HelysegContainerMode} from '../helysegcontainermode';
import {HelysegEgyMode} from '../helysegegymode';

@Component({
  selector: 'app-helyseg-szerkesztes',
  templateUrl: './helyseg-szerkesztes.component.html',
  styleUrls: ['./helyseg-szerkesztes.component.css']
})
export class HelysegSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  eppFrissit = false;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.helysegservice.uj) {
      p = this.helysegservice.Add(this.helysegservice.DtoEdited);
    } else {
      p = this.helysegservice.Update(this.helysegservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.helysegservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.helysegservice.uj) {
          this.helysegservice.Dto.unshift(res1.Result[0]);
        } else {
          this.helysegservice.Dto[this.helysegservice.DtoSelectedIndex] = res1.Result[0];
        }

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
    if (this.helysegservice.uj) {
      this.helysegservice.ContainerMode = HelysegContainerMode.List;
    } else {
      this.helysegservice.EgyMode = HelysegEgyMode.Reszletek;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
