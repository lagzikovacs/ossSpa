import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HibabejelentesService} from '../hibabejelentes.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {ProjektToolbarComponent} from '../../projekt/projekttoolbar/projekttoolbar.component';

@Component({
  selector: 'app-projekt-telepitesi-dokumentumok-kivalasztasa',
  templateUrl: './projekt-telepitesi-dokumentumok-kivalasztasa.component.html'
})
export class ProjektTelepitesiDokumentumokKivalasztasaComponent implements OnInit, AfterViewInit {
  @ViewChild('pt', {read: ViewContainerRef}) vc: ViewContainerRef;

  eppFrissit = false;

  constructor(private _errorservice: ErrorService,
              private _hibabejelentesservice: HibabejelentesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.vc);
    this.vc.clear();
    const cR = this.vc.createComponent(ProjektToolbarComponent);
    cR.instance.minta = 'kukk';
    console.log(this.vc);
  }
}
