import {IratDto} from '../irat/irat/iratdto';
import {DokumentumDto} from '../irat/dokumentum/dokumentumdto';

export class FotozasDto {
  sid: string;
  iratDto: IratDto[];
  dokumentumDto: DokumentumDto[];
}
