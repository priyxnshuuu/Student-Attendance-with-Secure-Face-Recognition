import { searchAggregation } from "../../aggregation/search/search.aggregation";
import { paginated } from "../../middleware/paginate/paginated.middleware";
import { models } from "../../models";

interface IGetRequestParams {
  paging: TPaging;
  searchParams: TSearchParams;
}

export const getAllStudent = async (params: IGetRequestParams) => {
  const { paging, searchParams } = params;

  const aggregationArray = searchAggregation(searchParams);

  return await paginated({
    aggregationArray: aggregationArray,
    Model: models.student,
    paging: paging,
  });
};
