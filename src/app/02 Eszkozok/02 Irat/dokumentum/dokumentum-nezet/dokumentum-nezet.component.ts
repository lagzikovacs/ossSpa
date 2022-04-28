import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumDto} from '../dokumentumdto';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dokumentum-nezet',
  templateUrl: './dokumentum-nezet.component.html'
})
export class DokumentumNezetComponent implements OnInit, OnDestroy {
  @Input() item: DokumentumDto;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }
  kesz = false;

  pdf: any;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.dokumentumservice.LetoltesPDF(this.item.Dokumentumkod);
      this.pdf = res.Result;

      this.kesz = true;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
