import { IconList } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

interface ExcelExportProps {
  ExcelData: any[]; // Change 'any' to the actual type of your ExcelData
  fileName: string;
}
const ExcelExport: React.FC<ExcelExportProps> = ({ ExcelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToExcel = (ExcelData: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(ExcelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      style={{
        color: "#ff008a",
        backgroundColor: "#ffe5f2",
      }}
      leftIcon={<IconList size={17} />}
      onClick={(e) => exportToExcel(ExcelData, fileName)}
    >
      Export to Excel
    </Button>
  );
};
export default ExcelExport;
