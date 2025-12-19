import { PrismaModelKey } from '@app/common/constants/prisma-model.map';
import { FilterValue } from './types/distinct.types';

export interface DistinctValuePlayload {
  tableName: PrismaModelKey;
  columnName: string;
  filters?: Record<string, FilterValue>;
  schoolId?: string;
}
