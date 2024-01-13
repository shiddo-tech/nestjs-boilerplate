import { ValueTransformer } from 'typeorm';
import { Hash } from '../../utils/hash';

export class PasswordTransformer implements ValueTransformer {
  to(value: string): string {
    return Hash.make(value);
  }

  from(value: string): string {
    return value;
  }
}
