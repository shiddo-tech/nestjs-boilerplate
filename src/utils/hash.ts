import * as bcrypt from 'bcrypt';

export class Hash {
  static make(plainText: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  static compare(plainText: string | Buffer, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
