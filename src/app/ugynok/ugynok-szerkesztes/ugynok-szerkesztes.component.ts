import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgynokService} from '../ugynok.service';
import {UgynokContainerMode} from "../ugynokcontainermode";
import {UgynokEgyMode} from "../ugynokegymode";
import {NumberResult} from "../../dtos/numberresult";

@Component({
  selector: 'app-ugynok-szerkesztes',
  templateUrl: './ugynok-szerkesztes.component.html',
  styleUrls: ['./ugynok-szerkesztes.component.css']
})
export class UgynokSzerkesztesComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;

  ugynokservice: UgynokService;
  public eppFrissit = false;

  constructor(ugynokservice: UgynokService) {
    this.ugynokservice = ugynokservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;

    if (this.ugynokservice.uj) {
      p = this.ugynokservice.Add(this.ugynokservice.DtoEdited);
    } else {
      p = this.ugynokservice.Update(this.ugynokservice.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.ugynokservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        if (this.ugynokservice.uj) {
          this.ugynokservice.Dto.unshift(res1.Result[0]);
        } else {
          this.ugynokservice.Dto[this.ugynokservice.DtoSelectedIndex] = res1.Result[0];
        }

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
    if (this.ugynokservice.uj) {
      this.ugynokservice.ContainerMode = UgynokContainerMode.List;
    } else {
      this.ugynokservice.EgyMode = UgynokEgyMode.Reszletek;
    }
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
