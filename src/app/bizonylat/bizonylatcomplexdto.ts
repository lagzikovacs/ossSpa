import {BizonylatTermekdijDto} from './bizonylattermekdijdto';
import {BizonylatAfaDto} from './bizonylatafadto';
import {BizonylatTetelDto} from './bizonylatteteldto';
import {BizonylatDto} from './bizonylatdto';

export class BizonylatComplexDto {
  Dto: BizonylatDto;
  LstTetelDto: BizonylatTetelDto[];
  LstAfaDto: BizonylatAfaDto[];
  LstTermekdijDto: BizonylatTermekdijDto[];
}
