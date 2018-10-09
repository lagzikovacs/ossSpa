import {SzMT} from '../../dtos/szmt';
import {AjanlatBuf} from './ajanlatbuf';

export class AjanlatParam {
  ProjektKod: number;
  Ervenyes: any;
  Tajolas: string;
  Termeles: number;
  Megjegyzes: string;
  SzuksegesAramerosseg: string;
  AjanlatBuf: AjanlatBuf[];
  Netto: number;
  Afa: number;
  Brutto: number;
  Fi: SzMT[];
}
