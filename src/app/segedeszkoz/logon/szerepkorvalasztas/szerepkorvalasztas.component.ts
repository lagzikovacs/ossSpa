import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../../tools/errormodal/errormodal.component';
import {LogonService} from '../../../services/segedeszkosz/logon.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-szerepkorvalasztas',
  templateUrl: './szerepkorvalasztas.component.html',
  styleUrls: ['./szerepkorvalasztas.component.css']
})
export class SzerepkorvalasztasComponent implements OnInit {
  @ViewChild(ErrormodalComponent) private errormodal: ErrormodalComponent;
  logonservice: LogonService;

  constructor(private _router: Router,
              logonservice: LogonService) {
    this.logonservice = logonservice;
  }

  ngOnInit() {
    this.logonservice.SzerepkorKivalasztva = false;
  }

  setClickedRow(i: number) {
    this.logonservice.SzerepkorValasztas(this.logonservice.lehetsegesszerepkorokDto[i].PARTICIOKOD,
      this.logonservice.lehetsegesszerepkorokDto[i].CSOPORTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.logonservice.SzerepkorKivalasztva = true;
        this._router.navigate(['/fooldal']);
      })
      .catch(err => {
        this.errormodal.show(err);
      });
  }
}
