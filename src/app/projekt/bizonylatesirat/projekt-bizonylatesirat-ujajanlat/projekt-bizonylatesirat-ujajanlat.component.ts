import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../logon/logon.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {BizonylatesIratContainerMode} from '../bizonylatesiratcontainermode';
import {AjanlatBuf} from '../ajanlatbuf';
import {AjanlatTetelTipus} from '../ajanlatteteltipus';

@Component({
  selector: 'app-projekt-bizonylatesirat-ujajanlat',
  templateUrl: './projekt-bizonylatesirat-ujajanlat.component.html',
  styleUrls: ['./projekt-bizonylatesirat-ujajanlat.component.css']
})
export class ProjektBizonylatesiratUjajanlatComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektkapcsolatservice: ProjektkapcsolatService;
  eppFrissit = false;

  Ervenyes: any;
  Szuksaram: any;
  Megjegyzes: any;

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
