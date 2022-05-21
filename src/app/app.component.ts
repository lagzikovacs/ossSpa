import {Component, HostListener} from '@angular/core';
import {LogonService} from './05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ScreenService} from './common/screen/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _logonservice: LogonService,
              private _screenService: ScreenService) {
    window.localStorage.clear();
    this._screenService.changeScreenSize({
      ScreenWidth: window.innerWidth,
      ScreenHeight: window.innerHeight
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.stopPropagation();
    event.preventDefault();
    this._screenService.changeScreenSize({
      ScreenWidth: event.target.innerWidth,
      ScreenHeight: event.target.innerHeight
    });
  }

  @HostListener('window:scroll')
  Gordites() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('GoTopBtn').style.display = 'block';
    } else {
      document.getElementById('GoTopBtn').style.display = 'none';
    }
  }

  @HostListener('window:beforeunload')
  async BezarasElott() {
    if (this._logonservice.isBejelentkezve()) {
      await this._logonservice.Kijelentkezes();
    }
  }

  onFel() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
