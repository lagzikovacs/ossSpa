import {Component, OnDestroy} from '@angular/core';
import * as FileSaver from 'file-saver';
import {RiportService} from '../../riport/riport.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../projekt.service';
import {b64toBlob} from '../../tools/b64toBlob';
import {ProjektContainerMode} from '../projektcontainermode';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-projekt-export',
  templateUrl: './projekt-export.component.html'
})
export class ProjektExportComponent implements OnDestroy {
  projektservice: ProjektService;
  riportservice: RiportService;
  eppFrissit = false;
  megszakitani = false;

  tasktoken = '';
  szamlalo: any;

  constructor(projektservice: ProjektService,
              private _errorservice: ErrorService,
              riportservice: RiportService) {
    this.projektservice = projektservice,
    this.riportservice = riportservice;
  }

  submit() {
    this.eppFrissit = true;
    this.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, this.projektservice.statuszszempont.toString()),
      new SzMT(Szempont.Null, this.projektservice.statuszexporthoz)
    ];

    this.riportservice.ProjektTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ciklus() {
    this.riportservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Status === 'Cancelled') {
          throw new Error('Felhasználói megszakítás!');
        }
        if (res.Status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.Status === 'Queued' || res.Status === 'Running') {
          this.szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, 'Projekt.xls');
          this.eppFrissit = false;
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  next() {
    clearInterval(this.szamlalo);

    if (this.megszakitani) {
      this.riportservice.TaskCancel(this.tasktoken)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.ciklus();
    }
  }

  megsem() {
    this.megszakitani = true;
  }
  ngOnDestroy() {
    clearInterval(this.szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
  vissza() {
    this.projektservice.ContainerMode = ProjektContainerMode.List;
  }
}
