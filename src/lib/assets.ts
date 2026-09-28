import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function hasPublicAsset(path: string): boolean {
  return existsSync(join(process.cwd(), 'public', path));
}
