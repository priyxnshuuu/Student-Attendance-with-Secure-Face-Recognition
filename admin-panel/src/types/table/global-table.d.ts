type TTableColumns = {
  key: string;
  header: string;
  renderCell?: (data: any) => void;
};
type TTableView = "list" | "grid";

type TTableHeaderProps = {
  rightComponent?: React.ReactNode;
  search?: boolean;
  onChangeText?: (value: string) => void;
};

type TCustomTable = {
  headerProps?: TTableHeaderProps;
  data: any[];
  columns: TTableColumns[];
  loading?: boolean;
  gridProps?: Pick<TGridView, "gridColumns" | "keyName" | "renderGridView">;
  paginationProps?: TTablePaging;
};

type TTableListView = { data: any[]; columns: TTableColumns[] };

type TGridView = {
  data: any[];
  gridColumns: number;
  fields: Object;
  renderGridView?: (item: any) => any;
  keyName?: string;
};
type TTablePaging = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};
