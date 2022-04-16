import {RiportService} from './riport.service';
import * as FileSaver from 'file-saver';
import {LiteEvent} from '../common/event/LiteEvent';
import {ErrorService} from '../common/errorbox/error.service';
import {b64toBlob} from '../common/b64toBlob';

export class Riportciklus {
  eventCiklusutan = new LiteEvent<void>();
  eventSpinnervege = new LiteEvent<void>();

  private _szamlalo: any;
  megszakitani = false;
  tasktoken = '';

  constructor(private _errorservice: ErrorService,
              private _riportservice: RiportService,
              private _fajlnev: string) {
  }

  async ciklus() {
    try {
      const res = await this._riportservice.TaskCheck(this.tasktoken);
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
        FileSaver.saveAs(blob, this._fajlnev);
        this.eventSpinnervege.trigger();

        this.eventCiklusutan.trigger();
      }
    } catch (err) {
      this.eventSpinnervege.trigger();
      this._errorservice.Error = err;

      this.eventCiklusutan.trigger();
    }
  }

  async next() {
    clearInterval(this._szamlalo);

    if (this.megszakitani) {
      try {
        const res = await this._riportservice.TaskCancel(this.tasktoken);
        if (res.Error != null) {
          throw res.Error;
        }

        this.eventSpinnervege.trigger();
      } catch (err) {
        this.eventSpinnervege.trigger();
        this._errorservice.Error = err;
      }
    } else {
      this.ciklus();
    }
  }
}
