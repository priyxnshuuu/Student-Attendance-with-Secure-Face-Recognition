import { PipelineStage } from "mongoose";

export const searchAggregation = (data: TSearchParams): PipelineStage[] => {
  const agger: PipelineStage[] = [];
  const { search, searchFieldString, searchFieldBoolean, searchFieldNumber } =
    data;

  agger.push({
    $sort: {
      createdAt: -1,
    },
  });

  if (search && searchFieldNumber && searchFieldNumber.length > 0) {
    searchFieldNumber.forEach((item) => {
      let object: any = {};
      object[item] = {
        $toString: {
          $toLong: `$${item}`,
        },
      };

      agger.push({
        $addFields: object,
      });
    });
  }

  if (!(search === "" || search === undefined)) {
    const SearchRegex = new RegExp(search, "i");
    if (searchFieldString !== undefined && searchFieldString.length > 0) {
      const fields = searchFieldString.map((item) => {
        let object: any = {};
        object[item] = SearchRegex;
        return object;
      });

      if (searchFieldNumber && searchFieldNumber.length > 0) {
        searchFieldNumber.forEach((item) => {
          let object: any = {};
          object[item] = SearchRegex;
          fields.push(object);
        });
      }

      agger.push({
        $match: {
          $or: fields,
        },
      });
    }
  }
  if (searchFieldBoolean && searchFieldBoolean.length > 0) {
    searchFieldBoolean.forEach((item) => {
      agger.push({
        $match: item,
      });
    });
  }
  return agger;
};
