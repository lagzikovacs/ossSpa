import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../services/logon.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujbizonylat',
  templateUrl: './projekt-bizonylatesirat-ujbizonylat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujbizonylat.component.css']
})
export class ProjektBizonylatesiratUjbizonylatComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  constructor(private _logonservice: LogonService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.navigal();
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.projektkapcsolatservice.ContainerMode = BizonylatesIratContainerMode.List;
  }
}
