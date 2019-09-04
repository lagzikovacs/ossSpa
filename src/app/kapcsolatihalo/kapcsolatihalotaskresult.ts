import {UgyfelDto} from '../ugyfel/ugyfeldto';
import {UgyfelkapcsolatDto} from '../ugyfelkapcsolat/ugyfelkapcsolatdto';

export class KapcsolatihaloTaskResult {
  Error: string;
  status: any;
  lstUgyfelkapcsolatDto: UgyfelkapcsolatDto[];
  lstUgyfelDto: UgyfelDto[];
}
