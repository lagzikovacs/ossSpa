import {IratDto} from '../../02 Eszkozok/02 Irat/irat/iratdto';
import {DokumentumDto} from '../../02 Eszkozok/02 Irat/dokumentum/dokumentumdto';
import {ProjektDto} from '../../02 Eszkozok/01 Projekt/projekt/projektdto';

export class FotozasDto {
  sid: string;
  iratDto: IratDto[];
  dokumentumDto: DokumentumDto[];
  projektDto: ProjektDto[];
}
