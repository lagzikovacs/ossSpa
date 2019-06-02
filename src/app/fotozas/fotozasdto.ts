import {IratDto} from '../irat/iratdto';
import {DokumentumDto} from '../dokumentum/dokumentumdto';

export class FotozasDto {
  sid: string;
  iratDto: IratDto[];
  dokumentumDto: DokumentumDto[];
}
