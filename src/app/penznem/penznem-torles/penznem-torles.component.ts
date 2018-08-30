import {Component, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {PenznemContainerMode} from '../penznemcontainermode';
import {PenznemEgyMode} from '../penznemegymode';

@Component({
  selector: 'app-penznem-torles',
  templateUrl: './penznem-torles.component.html',
  styleUrls: ['./penznem-torles.component.css']
})
export class PenznemTorlesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ok() {
    this.eppFrissit = true;
    this.penznemservice.Delete(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penznemservice.Dto.splice(this.penznemservice.DtoSelectedIndex, 1);
        this.penznemservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.penznemservice.ContainerMode = PenznemContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.penznemservice.EgyMode = PenznemEgyMode.Reszletek;
  }
}
