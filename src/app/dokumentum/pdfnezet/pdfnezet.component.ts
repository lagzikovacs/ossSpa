import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-pdfnezet',
  templateUrl: './pdfnezet.component.html'
})
export class PdfnezetComponent implements OnInit, OnDestroy {
  @Input() pdf: any;

  eppFrissit = false;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
