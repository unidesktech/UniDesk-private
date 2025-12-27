import * as crypto from 'crypto';

export function genJti() {
  return crypto.randomBytes(16).toString('hex');
}

export function genCsrf() {
  return crypto.randomBytes(24).toString('hex');
}

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const hashOtp = (otp: string) =>
  crypto.createHash('sha256').update(otp).digest('hex');

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
