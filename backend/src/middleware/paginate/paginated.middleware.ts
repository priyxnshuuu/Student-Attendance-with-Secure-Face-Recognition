import { Model, PipelineStage } from "mongoose";

import { getPaginationAggregation } from "../../aggregation/pagination/pagination.aggregation";

interface IPaginated {
  paging: TPaging;
  Model: Model<any>;
  aggregationArray: PipelineStage[];
  afterPaginated?: PipelineStage.FacetPipelineStage[];
}

export const paginated = async (
  props: IPaginated
): Promise<{ data: any[]; pageData: any }> => {
  const { Model, paging, aggregationArray, afterPaginated } = props;
  const paginationAggregation = getPaginationAggregation(
    paging.page,
    paging.itemPerPage,
    afterPaginated
  );
  const aggregateQuery: PipelineStage[] = [
    ...aggregationArray,
    ...paginationAggregation,
  ];

  let results: any[] = [];

  if (aggregateQuery.length > 0) {
    results = await Model.aggregate(aggregateQuery).exec();
  } else {
    results = await Model.find({}).exec();
  }

  if (results.length == 0) {
    return {
      data: [],
      pageData: undefined,
    };
  }

  return {
    data: results[0].data ? results[0].data : results,
    pageData: results[0].pageData ?? { total: 0 },
  };
};
