import mongoose, { PipelineStage } from 'mongoose';
import { ILocationData, IStringObject } from './interfaces';

interface ProjectStage {
  $project: {
    [key: string]: number;
  };
}

export class PostFeatures {
  stages: PipelineStage[] = [];
  constructor(
    public queryString: IStringObject,
    public userLocation: ILocationData | null = null
  ) {}

  distanceFrom(): this {
    if (!this.userLocation?.coordinates.length) return this;
    const geoNearStages: PipelineStage[] = [
      {
        $geoNear: {
          near: this.userLocation,
          distanceField: 'distance',
          spherical: true,
          distanceMultiplier: 0.001,
        },
      },
      {
        $addFields: {
          distance: { $round: ['$distance'] },
        },
      },
    ];
    this.stages.push(...geoNearStages);
    return this;
  }

  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ['search', 'page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    let matchStage: PipelineStage.Match = { $match: {} };
    Object.entries(queryObj).forEach(([key, value]) => {
      if (!value) return;
      if (value.includes(',')) {
        matchStage.$match[key] = { $in: value.split(',') };
      } else {
        matchStage.$match[key] =
          key === 'itemCount'
            ? Number(value)
            : key === '_id'
            ? new mongoose.Types.ObjectId(value)
            : value;
      }
    });
    this.stages.push(matchStage);
    return this;
  }

  limitFields(): this {
    const selectStage: ProjectStage = {
      $project: {},
    };

    if (!this.queryString.fields) {
      selectStage.$project.__v = 0;
      this.stages.push(selectStage);
      return this;
    }

    const fields = this.queryString.fields.split(',');
    fields.forEach((field: string) => {
      selectStage.$project[field] = 1;
    });

    this.stages.push(selectStage);
    return this;
  }

  search(): this {
    if (!this.queryString.search) return this;

    const term = this.queryString.search;
    console.log('term', term);
    const matchStage = {
      $match: {
        $or: [
          { title: { $regex: `.*${term}.*`, $options: 'i' } },
          { description: { $regex: `.*${term}.*`, $options: 'i' } },
        ],
      },
    };
    this.stages.push(matchStage);
    return this;
  }

  sort = (): this => {
    if (!this.queryString.sort) return this;

    const sortBy = this.queryString.sort.split(',');
    const sortObj: Record<string, 1 | -1> = {};
    sortBy.forEach((field: string) => {
      const sortOrder = field.startsWith('-') ? -1 : 1;
      const fieldName = field.replace(/^-/, '');
      sortObj[fieldName] = sortOrder;
    });
    const sortStage = { $sort: sortObj };
    this.stages.push(sortStage);
    return this;
  };

  countAndPaginate(): this {
    if (!this.queryString.page || !this.queryString.limit) return this;
    const page: number = parseInt(this.queryString.page) || 1;
    const limit: number = parseInt(this.queryString.limit) || 20;
    const skip = (page - 1) * limit;

    const countAndPaginateStages = [
      {
        $facet: {
          metadata: [
            {
              $group: {
                _id: null,
                totalResults: { $sum: 1 },
              },
            },
            {
              $addFields: {
                totalPages: { $ceil: { $divide: ['$totalResults', limit] } },
                nextPage: page + 1,
              },
            },
          ],
          posts: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
      {
        $unwind: '$metadata',
      },
    ];

    this.stages = [...this.stages, ...countAndPaginateStages];
    return this;
  }
}

// export const count = (queryString: StringObject): PipelineStage.Group => {
//   return {
//     $group: {
//       _id: null,
//       total: { $sum: 1 },
//       page: { $sum: queryString.page },
//       posts: { $push: '$$ROOT' },
//     },
//   };
// };

// export const paginate = (queryString: StringObject): PipelineStage[] => {
//   const page: number = parseInt(queryString.page) || 1;
//   const limit: number = parseInt(queryString.limit) || 20;
//   const skip = (page - 1) * limit;

//   return [
//     {
//       $skip: skip,
//     },
//     {
//       $limit: limit,
//     },
//   ];
// };
