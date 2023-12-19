import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from 'typeorm';
import { array, number, object, string } from 'yup';
import yup from 'yup';

export interface IPageOptions {
  locale?: ESupportedLocales;
  page?: number;
  perPage?: number;
  sortBy?: string | IMultipleSortOptions[];
  where?: IWhere[];
  relations?: string[];
  fields?: string[];
  from?: {
    [key: string]: string;
  };
}
interface IMultipleSortOptions {
  key: string;
  sortDirection?: ESortDirection;
}

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  DEFAUL = 'ASC',
}

export enum ESupportedLocales {
  EN = 'en',
  ES = 'es',
  AR = 'ar',
  FR = 'fr',
}

export class PageOptionsDto {
  @ApiProperty()
  locale?: ESupportedLocales;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  sortBy?: string | IMultipleSortOptions[];

  @ApiProperty()
  where?: string[];

  @ApiProperty()
  relations?: string[];

  @ApiProperty()
  fields?: string[];

  @ApiProperty()
  from?: {
    [key: string]: string;
  };
}

export interface IWhere {
  operator:
    | 'is'
    | 'is_not'
    | 'eq'
    | 'not'
    | 'in'
    | 'not_in'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'contains'
    | 'not_contains'
    | 'starts_with'
    | 'ends_with'
    | 'not_starts_with'
    | 'not_ends_with';
  andOr?: 'andWhere' | 'orWhere';
  parentAndOr?: 'andWhere' | 'orWhere';
  parentNot?: boolean;

  operands: [string, string | null];
}

// export const pageOptionsSchema = object({
//   locale: string().oneOf(Object.values(ESupportedLocales)).optional(),
//   page: number().optional(),
//   perPage: number().optional(),
//   sortBy: yup.mixed()['oneOfSchemas']([
//     string(),
//     array(
//       object({
//         key: string(),
//         sortDirection: string(),
//       }),
//     ),
//   ]),
//   filterBy: array(string()).optional(),
//   relations: array(string()).optional(),
//   fields: array(string()).optional(),
//   from: object().optional(),
// });

// yup.addMethod(
//   yup.MixedSchema,
//   'oneOfSchemas',
//   function (schemas: yup.AnySchema[]) {
//     return this.test(
//       'one-of-schemas',
//       'value not valid',

//       (item) =>
//         schemas.some((schema) => schema.isValidSync(item, { strict: true })),
//     );
//   },
// );

export class PageDto<T> {
  @ApiProperty()
  data: Array<T>;

  @ApiProperty()
  metadata: {
    count: number;
    page: number;
    limit: number;
    sortedBy?: { [key: string]: SortDirection };
    filteredBy?: {
      fields: string[];
      query: string;
    };
  };
}
