import {Component, HostListener} from '@angular/core';
import {LogonService} from './logon/logon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _logonservice: LogonService) {
    window.localStorage.clear();
  }

  @HostListener('window:beforeunload')
  BezarasElott() {
    if (this._logonservice.isBejelentkezve()) {
      this._logonservice.Kijelentkezes().then();
    }
  }

  @HostListener('window:scroll')
  Gordites() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('GoTopBtn').style.display = 'block';
    } else {
      document.getElementById('GoTopBtn').style.display = 'none';
    }
  }

  onFel() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
