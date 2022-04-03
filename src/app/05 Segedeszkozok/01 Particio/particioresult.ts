import {ParticioDto} from './particiodto';

export class ParticioResult {
  Error: string = '';
  Result: ParticioDto[] = new Array<ParticioDto>();
}
