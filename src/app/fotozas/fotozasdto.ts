import {IratDto} from '../irat/iratdto';
import {DokumentumDto} from '../dokumentum/dokumentumdto';
import {ProjektDto} from '../02 Eszkozok/01 Projekt/projekt/projektdto';

export class FotozasDto {
  sid: string;
  iratDto: IratDto[];
  dokumentumDto: DokumentumDto[];
  projektDto: ProjektDto[];
}
