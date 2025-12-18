import * as crypto from 'crypto';

export function genJti() {
  return crypto.randomBytes(16).toString('hex');
}

export function genCsrf() {
  return crypto.randomBytes(24).toString('hex');
}
