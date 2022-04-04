import {ErrorService} from '../common/errorbox/error.service';
import {b64toBlob} from '../common/b64toBlob';
import * as FileSaver from 'file-saver';
import {LiteEvent} from '../common/event/LiteEvent';
import {BizonylatnyomtatasService} from './bizonylatnyomtatas.service';

export class Bizonylatnyomtatasciklus {
  eventCiklusutan = new LiteEvent<void>();
  eventSpinnervege = new LiteEvent<void>();

  private _szamlalo: any;
  megszakitani = false;
  tasktoken = '';
  fajlnev: string;

  constructor(private _errorservice: ErrorService,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService) {
  }

  ciklus() {
    this._bizonylatnyomtatasservice.TaskCheck(this.tasktoken)
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
          this._szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, this.fajlnev);
          this.eventSpinnervege.trigger();

          this.eventCiklusutan.trigger();
        }
      })
      .catch(err => {
        this.eventSpinnervege.trigger();
        this._errorservice.Error = err;

        this.eventCiklusutan.trigger();
      });
  }

  next() {
    clearInterval(this._szamlalo);

    if (this.megszakitani) {
      this._bizonylatnyomtatasservice.TaskCancel(this.tasktoken)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.eventSpinnervege.trigger();
        })
        .catch(err => {
          this.eventSpinnervege.trigger();
          this._errorservice.Error = err;
        });
    } else {
      this.ciklus();
    }
  }
}

