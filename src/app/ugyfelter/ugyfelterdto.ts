import {UgyfelDto} from '../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {ProjektDto} from '../projekt/projektdto';

export class UgyfelterDto {
  sid: string;
  ugyfelDto: UgyfelDto;
  lstProjektDto: ProjektDto[];
}
