import * as FileSaver from 'file-saver';
import {BizonylatnyomtatasService} from './bizonylatnyomtatas.service';
import {LiteEvent} from '../../common/event/LiteEvent';
import {b64toBlob} from '../../common/b64toBlob';
import {ErrorService} from '../../common/errorbox/error.service';

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

  async ciklus() {
    try {
      const res = await this._bizonylatnyomtatasservice.TaskCheck(this.tasktoken);
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
        this._szamlalo = setInterval(async() => { await this.next(); }, 1000);
      }

      if (res.Status === 'Completed') {
        const blob = b64toBlob(res.Riport);
        FileSaver.saveAs(blob, this.fajlnev);
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
        const res = await this._bizonylatnyomtatasservice.TaskCancel(this.tasktoken);
        if (res.Error != null) {
          throw res.Error;
        }

        this.eventSpinnervege.trigger();
      } catch (err) {
        this.eventSpinnervege.trigger();
        this._errorservice.Error = err;
      }
    } else {
      await this.ciklus();
    }
  }
}

