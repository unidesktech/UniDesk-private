import { SetMetadata } from '@nestjs/common';

export const TRACK = 'TRACK_METHOD';

export const Track = () => SetMetadata(TRACK, true);
