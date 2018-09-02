import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../services/logon.service';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat',
  templateUrl: './projekt-bizonylatesirat-ujajanlat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat.component.css']
})
export class ProjektBizonylatesiratUjajanlatComponent implements OnInit {
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
