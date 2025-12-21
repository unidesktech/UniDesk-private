import { PRISMA_MODEL_MAP } from '@app/common/constants/prisma-model.map';
import { DistinctValuePlayload } from '@app/dto/common.dto';
import { PrismaService } from '@app/prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from 'libs/prisma/generated';

@Injectable()
export class CommonsService {
  constructor(private prismaService: PrismaService) {}

  async getDistinctValue(
    params: DistinctValuePlayload,
  ): Promise<{ id: string; value: string }[]> {
    const { tableName, columnName, filters = {}, schoolId } = params;

    const dbTable = PRISMA_MODEL_MAP[tableName];
    if (!dbTable) {
      throw new BadRequestException('Invalid table name');
    }

    const { table, idColumn } = dbTable;

    const conditions: Prisma.Sql[] = [
      Prisma.sql`is_active = true`,
      Prisma.sql`is_deleted = false`,
    ];

    if (schoolId) {
      conditions.push(Prisma.sql`school_id = ${schoolId}`);
    }

    for (const [column, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        conditions.push(
          Prisma.sql`${Prisma.raw(column)} IN (${Prisma.join(value)})`,
        );
      } else {
        conditions.push(Prisma.sql`${Prisma.raw(column)} = ${value}`);
      }
    }

    const whereSql = Prisma.join(conditions, ' AND ');

    const query = Prisma.sql`
      SELECT
        ${Prisma.raw(idColumn)} AS id,
        ${Prisma.raw(columnName)} AS value
      FROM ${Prisma.raw(table)}
      WHERE ${whereSql}
      GROUP BY ${Prisma.raw(idColumn)}, ${Prisma.raw(columnName)}
      ORDER BY value
    `;

    return this.prismaService.$queryRaw<{ id: string; value: string }[]>(query);
  }
}
