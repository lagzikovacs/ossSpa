import {Component, OnInit, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-bizonylat-container',
  templateUrl: './bizonylat-container.component.html',
  styleUrls: ['./bizonylat-container.component.css']
})
export class BizonylatContainerComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;

  constructor(bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.bizonylatservice.GetBizonylatLeiro()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
}
