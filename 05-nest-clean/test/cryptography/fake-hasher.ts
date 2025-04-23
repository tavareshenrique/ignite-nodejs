import { HashComparer } from '@/domain/forum/application/cryptography/hash-compare';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return Promise.resolve(plain.concat('-hashed'));
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return Promise.resolve(plain.concat('-hashed') === hashed);
  }
}
