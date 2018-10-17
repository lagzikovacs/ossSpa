import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BizonylatkifizetesService} from '../bizonylatkifizetes.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatKifizetesContainerMode} from '../bizonylatkifizetescontainermode';
import {BizonylatKifizetesEgyMode} from '../bizonylatkifizetesegymode';

@Component({
  selector: 'app-bizonylat-kifizetes-torles',
  templateUrl: './bizonylat-kifizetes-torles.component.html',
  styleUrls: ['./bizonylat-kifizetes-torles.component.css']
})
export class BizonylatKifizetesTorlesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatkifizetesservice: BizonylatkifizetesService;
  eppFrissit = false;

  constructor(bizonylatkifizetesservice: BizonylatkifizetesService) {
    this.bizonylatkifizetesservice = bizonylatkifizetesservice;
  }

  ok() {
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
  cancel() {
    this.bizonylatkifizetesservice.EgyMode = BizonylatKifizetesEgyMode.Reszletek;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
