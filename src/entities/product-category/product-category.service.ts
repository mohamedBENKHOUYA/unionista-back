import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Brackets,
  EntityManager,
  EntityMetadata,
  FindOptionsUtils,
  NotBrackets,
  QueryBuilder,
  Repository,
  SelectQueryBuilder,
  WhereExpression,
  WhereExpressionBuilder,
  getConnection,
} from 'typeorm';
import { ProductCategoryModel } from './product-category.model';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryTranslation } from './product-category-trans.model';
import { CreateProductCategoryDto } from './dtos/create-product-category.dto';
import {
  ESupportedLocales,
  IPageOptions,
  IWhere,
} from '@src/shared/paginator/dtos/page-options';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryModel)
    private productCategoryRepository: Repository<ProductCategoryModel>,
    @InjectRepository(ProductCategoryTranslation)
    private productCategoryTranslationRepository: Repository<ProductCategoryTranslation>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async list({ locale, where, relations }: IPageOptions) {
    const alias = 'productCategory';
    let qb = this.productCategoryRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect('productCategory.translations', 'withTranslations');
    if (locale) {
      qb = qb.where('withTranslations.locale = :locale', {
        locale: locale || ESupportedLocales.EN,
      });
    }
    return andOrWhereQuery<ProductCategoryModel>(qb, where, alias)
      .setFindOptions({
        relations: relations,
      })
      .getMany();
  }
  async create(data: CreateProductCategoryDto, options: IPageOptions) {
    return await this.entityManager.transaction(
      async (transactionManager: EntityManager) => {
        const entity = this.productCategoryRepository.create(data);
        const saved = await transactionManager.save(entity);
        const entityTranslation =
          this.productCategoryTranslationRepository.create({
            ...data,
            id: saved.id,
            // locale: options.locale,
          });

        await transactionManager.save(entityTranslation);
      },
    );
  }

  async find({ id, locale }) {
    const alias = 'productCategory';
    const qb = this.productCategoryRepository.createQueryBuilder(alias);

    const found = await qb
      .leftJoinAndSelect('productCategory.translations', 'productCategories')
      .leftJoinAndSelect('productCategory.children', 'pc')
      .where('productCategories.locale = :locale', {
        locale: locale || ESupportedLocales.EN,
      })
      .andWhere('productCategory.id = :id', { id })
      .getOne();

    if (!found) {
      throw new NotFoundException('Product category not found');
    }

    return found;
  }
}

function whereQuery<T>(
  query: SelectQueryBuilder<T>,
  where: IWhere[],
  alias: string,
) {
  if (!where) return query;
  return where.reduce((acc: any, current) => {
    switch (current.operator) {
      case 'is':
        return current.andOr
          ? acc[current.andOr](`${alias}.${current.operands[0]} is NULL`)
          : acc.where(`${alias}.${current.operands[0]} is NULL`);
      case 'is_not':
        return current.andOr
          ? acc[current.andOr](`${alias}.${current.operands[0]} is NOT NULL`)
          : acc.where(`${alias}.${current.operands[0]} is NOT NULL`);
      case 'eq':
        return current.andOr
          ? acc[current.andOr](`${alias}.${current.operands[0]} = :value`, {
              value: current.operands[1],
            })
          : acc.where(`${alias}.${current.operands[0]} = :value`, {
              value: current.operands[1],
            });
      case 'not':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} != :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} != :value`, {
              value: current.operands[1],
            });
        break;
      case 'in':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} IN :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} IN :value`, {
              value: current.operands[1],
            });
        break;
      case 'not_in':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} NOT IN :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} NOT IN :value`, {
              value: current.operands[1],
            });
        break;
      case 'lt':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} < :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} < :value`, {
              value: current.operands[1],
            });
        break;
      case 'lte':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} <= :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} <= :value`, {
              value: current.operands[1],
            });
        break;
      case 'gt':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} > :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} > :value`, {
              value: current.operands[1],
            });
        break;
      case 'gte':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} >= :value`, {
              value: current.operands[1],
            })
          : acc.where(`${current.operands[0]} >= :value`, {
              value: current.operands[1],
            });
        break;
      case 'contains':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} ILIKE :value`, {
              value: `%${current.operands[1]}%`,
            })
          : acc.where(`${current.operands[0]} ILIKE :value`, {
              value: `%${current.operands[1]}%`,
            });
        break;
      case 'not_contains':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} NOT ILIKE :value`, {
              value: `%${current.operands[1]}%`,
            })
          : acc.where(`${current.operands[0]} NOT ILIKE :value`, {
              value: `%${current.operands[1]}%`,
            });
        break;
      case 'starts_with':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} ILIKE :value`, {
              value: `${current.operands[1]}%`,
            })
          : acc.where(`${current.operands[0]} ILIKE :value`, {
              value: `${current.operands[1]}%`,
            });
        break;
      case 'not_starts_with':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} NOT ILIKE :value`, {
              value: `${current.operands[1]}%`,
            })
          : acc.where(`${current.operands[0]} NOT ILIKE :value`, {
              value: `${current.operands[1]}%`,
            });
        break;
      case 'ends_with':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} ILIKE :value`, {
              value: `%${current.operands[1]}`,
            })
          : acc.where(`${current.operands[0]} ILIKE :value`, {
              value: `%${current.operands[1]}`,
            });
        break;
      case 'not_ends_with':
        current.andOr
          ? acc[current.andOr](`${current.operands[0]} NOT ILIKE :value`, {
              value: `%${current.operands[1]}`,
            })
          : acc.where(`${current.operands[0]} NOT ILIKE :value`, {
              value: `%${current.operands[1]}`,
            });
        break;

      default:
        if (Array.isArray(current)) {
          return current[0].parentAndOr
            ? acc[current[0].parentAndOr](
                current[0].parentNot
                  ? new NotBrackets((qb: SelectQueryBuilder<T>) => {
                      whereQuery(qb, current, alias);
                    })
                  : new Brackets((qb: SelectQueryBuilder<T>) => {
                      whereQuery(qb, current, alias);
                    }),
              )
            : acc.where(
                new Brackets((qb: SelectQueryBuilder<T>) => {
                  whereQuery(qb, current, alias);
                }),
              );
        }
        return query;
    }
  }, query) as SelectQueryBuilder<T>;
}
function andOrWhereQuery<T>(
  query: SelectQueryBuilder<T>,
  where: IWhere[],
  alias: string,
  initialAndOr = 'andWhere',
) {
  if (!where) return query;
  return where.reduce((acc: any, current) => {
    switch (current.operator) {
      case 'is':
        return acc[current.andOr ?? initialAndOr](
          `${alias}.${current.operands[0]} is NULL`,
        );
      case 'is_not':
        return acc[current.andOr ?? initialAndOr](
          `${alias}.${current.operands[0]} is NOT NULL`,
        );
      case 'eq':
        return acc[current.andOr ?? initialAndOr](
          `${alias}.${current.operands[0]} = :value`,
          {
            value: current.operands[1],
          },
        );

      case 'not':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} != :value`,
          {
            value: current.operands[1],
          },
        );

      case 'in':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} IN :value`,
          {
            value: current.operands[1],
          },
        );

      case 'not_in':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} NOT IN :value`,
          {
            value: current.operands[1],
          },
        );

      case 'lt':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} < :value`,
          {
            value: current.operands[1],
          },
        );

      case 'lte':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} <= :value`,
          {
            value: current.operands[1],
          },
        );

      case 'gt':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} > :value`,
          {
            value: current.operands[1],
          },
        );

      case 'gte':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} >= :value`,
          {
            value: current.operands[1],
          },
        );

      case 'contains':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} ILIKE :value`,
          {
            value: `%${current.operands[1]}%`,
          },
        );

      case 'not_contains':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} NOT ILIKE :value`,
          {
            value: `%${current.operands[1]}%`,
          },
        );

      case 'starts_with':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} ILIKE :value`,
          {
            value: `${current.operands[1]}%`,
          },
        );

      case 'not_starts_with':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} NOT ILIKE :value`,
          {
            value: `${current.operands[1]}%`,
          },
        );

      case 'ends_with':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} ILIKE :value`,
          {
            value: `%${current.operands[1]}`,
          },
        );

      case 'not_ends_with':
        return acc[current.andOr ?? initialAndOr](
          `${current.operands[0]} NOT ILIKE :value`,
          {
            value: `%${current.operands[1]}`,
          },
        );

      default:
        if (Array.isArray(current)) {
          return current[0].parentAndOr
            ? acc[current[0].parentAndOr](
                current[0].parentNot
                  ? new NotBrackets((qb: SelectQueryBuilder<T>) => {
                      whereQuery(qb, current, alias);
                    })
                  : new Brackets((qb: SelectQueryBuilder<T>) => {
                      whereQuery(qb, current, alias);
                    }),
              )
            : acc.where(
                new Brackets((qb: SelectQueryBuilder<T>) => {
                  whereQuery(qb, current, alias);
                }),
              );
        }
        return query;
    }
  }, query) as SelectQueryBuilder<T>;
}
