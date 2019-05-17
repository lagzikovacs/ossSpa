import {Component, OnDestroy, ViewChild} from '@angular/core';
import {RiportService} from '../riport.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import * as moment from 'moment';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';

@Component({
  selector: 'app-bejovoszamla',
  templateUrl: './bejovoszamla.component.html',
  styleUrls: ['./bejovoszamla.component.css']
})
export class BejovoszamlaComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  riportservice: RiportService;
  eppFrissit = false;
  megszakitani = false;

  tol = '2019-01-01';
  ig = '2019-12-31';

  tasktoken = '';
  szamlalo: any;

  constructor(riportservice: RiportService) {
    this.riportservice = riportservice;
  }

  submit() {
    this.eppFrissit = true;
    this.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, moment(this.tol).toISOString(true)),
      new SzMT(Szempont.Null, moment(this.ig).toISOString(true))
    ];

    this.riportservice.BejovoSzamlaTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.ciklus();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
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
          FileSaver.saveAs(blob, 'Bejövő számla.xls');
          this.eppFrissit = false;
        }
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
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
          this.errormodal.show(err);
          this.eppFrissit = false;
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
}
