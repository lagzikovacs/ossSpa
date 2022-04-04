import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from '../../common/errorbox/error.service';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumDto} from '../dokumentumdto';

@Component({
  selector: 'app-dokumentum-nezet',
  templateUrl: './dokumentum-nezet.component.html'
})
export class DokumentumNezetComponent implements OnInit, OnDestroy {
  @Input() item: DokumentumDto;

  eppFrissit = false;
  kesz = false;

  pdf: any;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit(): void {
    this.eppFrissit = true;
    this.dokumentumservice.LetoltesPDF(this.item.Dokumentumkod)
      .then(res => {
        this.pdf = res.Result;

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
