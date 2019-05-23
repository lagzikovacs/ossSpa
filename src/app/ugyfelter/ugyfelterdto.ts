import {UgyfelDto} from '../ugyfel/ugyfeldto';
import {ProjektDto} from '../projekt/projekt/projektdto';

export class UgyfelterDto {
  sid: string;
  ugyfelDto: UgyfelDto;
  lstProjektDto: ProjektDto[];
}
