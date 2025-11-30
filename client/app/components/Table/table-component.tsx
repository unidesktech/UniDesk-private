import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface TableProps {
  headers: string[];
  data: Record<string, any>[];
}
const TableComponent: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead key={idx}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {headers.map((header, hIdx) => {
              const key = header.toLowerCase().replace(/\s/g, "");
              return <TableCell key={hIdx}>{row[key]}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
