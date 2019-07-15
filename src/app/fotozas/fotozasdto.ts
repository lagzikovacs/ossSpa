import {IratDto} from '../irat/iratdto';
import {DokumentumDto} from '../dokumentum/dokumentumdto';
import {ProjektDto} from '../projekt/projektdto';

export class FotozasDto {
  sid: string;
  iratDto: IratDto[];
  dokumentumDto: DokumentumDto[];
  projektDto: ProjektDto[];
}
