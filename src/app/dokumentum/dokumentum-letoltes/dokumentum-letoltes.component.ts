import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {DokumentumDto} from '../dokumentumdto';

@Component({
  selector: 'app-dokumentum-letoltes',
  templateUrl: './dokumentum-letoltes.component.html'
})
export class DokumentumLetoltesComponent implements OnInit, OnDestroy {
  @Input() item: DokumentumDto;

  eppFrissit = false;
  kesz = false;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit(): void {
      this.eppFrissit = true;
      this.dokumentumservice.Kimentes(this.item)
        .then(res => {
          this.eppFrissit = false;
          this.kesz = true;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
