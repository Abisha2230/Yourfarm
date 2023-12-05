// import { Tooltip } from '@mui/material';
// import * as Filesaver from 'file-saver';
import XLSX from "sheetjs-style";
// import Button from 'src/theme/overrides/Button';
import { Icon } from "@iconify/react";

const ExportExcel = ({
  exceldata,
  exceldata1,
  filename,
  from,
  to,
  exportele,
}) => {
  // const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // const fileExtension = '.xlsx';
  const exporttoExcel = async () => {
    if (exceldata?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(exceldata);
      console.log(JSON.stringify(exceldata) + "exceldata1exceldata1exceldata1");
      // const wb = {sheets: {'data':ws},SheetNames:['data']};
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `Order details -${from} - ${to}.xlsx`);
      // const excelBuffer = XLSX.write(wb, {bookType: 'xlsx',type:'array'});
      // const data = new Blob([excelBuffer], {type: filetype});
      // Filesaver.saveAs(data,filename+fileExtension);
    }
  };
  // const ExportPickList = ({ exceldata, filename, from, to, exportele }) => {
  const exporttoExcelPickList = async () => {
    console.log(JSON.stringify(exceldata1) + "exceldata1exceldata1exceldata1");
    if (exceldata1?.data?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(exceldata1?.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `Picklist  - ${from} - ${to}.xlsx`);
    }
  };

  // }
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <div
          onClick={(e) => {
            exportele && exporttoExcel(filename);
          }}
          style={
            exportele && exceldata?.length > 0
              ? {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "grey",
                  textDecoration: "underline",
                }
          }
        >
          <Icon icon="ion:download-outline" fontSize="20px" />
          <h4 style={{ fontSize: "15px", marginLeft: "3px" }}>Export report</h4>
        </div>

        <div
          onClick={(e) => {
            exportele && exporttoExcelPickList(filename);
          }}
          style={
            exportele && exceldata1
              ? {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "grey",
                  textDecoration: "underline",
                }
          }
        >
          <Icon icon="ion:download-outline" fontSize="20px" />
          <h4 style={{ fontSize: "15px", marginLeft: "3px" }}>
            Export Pick List
          </h4>
        </div>
      </div>
    </>
  );
};

export default ExportExcel;
