type TQueryParams = {
  paging?: { page: number; itemPerPage: number };
  searchParams?: {
    search: string;
    searchFieldNumber?: string[];
    searchFieldString?: string[];
  };
};
