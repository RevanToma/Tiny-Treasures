"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFeatures = void 0;
class PostFeatures {
    constructor(queryString, userLocation = null) {
        this.queryString = queryString;
        this.userLocation = userLocation;
        this.stages = [];
        this.sort = () => {
            if (!this.queryString.sort)
                return this;
            const sortBy = this.queryString.sort.split(",");
            const sortObj = {};
            sortBy.forEach((field) => {
                const sortOrder = field.startsWith("-") ? -1 : 1;
                const fieldName = field.replace(/^-/, "");
                sortObj[fieldName] = sortOrder;
            });
            const sortStage = { $sort: sortObj };
            this.stages.push(sortStage);
            return this;
        };
    }
    distanceFrom() {
        if (!this.userLocation)
            return this;
        const geoNearStage = {
            $geoNear: {
                near: this.userLocation,
                distanceField: "distance",
                spherical: true,
                distanceMultiplier: 0.001,
            },
        };
        this.stages.push(geoNearStage);
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.queryString);
        const excludedFields = ["search", "page", "sort", "limit", "fields"];
        excludedFields.forEach((field) => delete queryObj[field]);
        let matchStage = { $match: {} };
        Object.entries(queryObj).forEach(([key, value]) => {
            matchStage.$match[key] = key === "itemCount" ? Number(value) : value;
        });
        this.stages.push(matchStage);
        return this;
    }
    limitFields() {
        const selectStage = {
            $project: {},
        };
        if (!this.queryString.fields) {
            selectStage.$project.__v = 0;
            this.stages.push(selectStage);
            return this;
        }
        const fields = this.queryString.fields.split(",");
        fields.forEach((field) => {
            selectStage.$project[field] = 1;
        });
        this.stages.push(selectStage);
        return this;
    }
    search() {
        if (!this.queryString.search)
            return this;
        const term = this.queryString.search;
        console.log("term", term);
        const matchStage = {
            $match: {
                $or: [
                    { title: { $regex: `.*${term}.*`, $options: "i" } },
                    { description: { $regex: `.*${term}.*`, $options: "i" } },
                ],
            },
        };
        this.stages.push(matchStage);
        return this;
    }
    countAndPaginate() {
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 20;
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
                                totalPages: { $ceil: { $divide: ["$totalResults", limit] } },
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
                $unwind: "$metadata",
            },
        ];
        this.stages = [...this.stages, ...countAndPaginateStages];
        return this;
    }
}
exports.PostFeatures = PostFeatures;
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
