"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import clsx from "clsx";
import CustomPagination from "./pagination";
import { CheckCircle, XCircle } from "lucide-react";
import ActionButton from "./action-button";
import { TableComponentProps } from "@/app/models/table.model";
import useViewportMatch from "@/app/hooks/use-viewport-match";

const TableComponent = ({
  headers = [],
  data = [],
  onRowClick,
  columnStyles = {},
  styles,
  clickableFields = [],
  checkBox = false,
  onSelectRow,
  pagination = false,
  onPaginationChange,
  totalValues,
  avatar = false,
  rowActionsConfig,
  variant = "auto",
  onAction,
  pageSizes,
}: TableComponentProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    onPaginationChange?.(page, limit);
  }, [page, limit]);

  useEffect(() => {
    onSelectRow?.(selected);
  }, [selected]);

  const toggleRow = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelected(selected.length === data.length ? [] : data.map((d) => d.id));
  };

  const renderCell = (row: any, h: any, clickable: boolean) => {
    if (h.key === "status") {
      return (
        <Badge
          className={
            row[h.key] === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }
        >
          {row[h.key] === "active" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <XCircle className="w-3 h-3 mr-1" />
          )}
          {row[h.key]}
        </Badge>
      );
    }

    return (
      <span
        className={clsx(clickable && "text-blue-600 underline cursor-pointer")}
        onClick={(e) => {
          if (!clickable) return;
          e.stopPropagation();
          onRowClick?.(row);
        }}
      >
        {row[h.key] ?? "-"}
      </span>
    );
  };
  const isDesktop = useViewportMatch(768);
  const resolvedVariant =
    variant === "auto" ? (isDesktop ? "table" : "card") : variant;

  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div
      className={clsx(
        `bg-white rounded-xl flex flex-col items-center ${
          resolvedVariant === "table" && "border shadow-sm"
        } transition-transform pb-2`,
        styles?.className
      )}
      style={styles?.inlineStyles}
    >
      {/* topHeader selection info */}
      <div
        className={clsx(
          "overflow-hidden bg-blue-50 border-b w-full border-blue-200 px-6 flex items-center justify-between transition-all duration-300 rounded-t-xl",
          selected.length > 0
            ? "max-h-24 py-3 opacity-100"
            : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="text-sm text-blue-900">
          {selected.length} item{selected.length > 1 ? "s" : ""} selected
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Selected
          </Button>
          <Button variant="outline" size="sm">
            Delete Selected
          </Button>
        </div>
      </div>
      {/* table */}
      {resolvedVariant === "table" ? (
        <Table
          className={styles?.tableStyles?.className}
          style={styles?.tableStyles?.inlineStyles}
        >
          <TableHeader>
            <TableRow>
              {checkBox && (
                <TableHead className="w-10 md:w-15 px-6 py-4">
                  <Checkbox
                    checked={selected.length === data.length && data.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
              )}

              {headers.map((h) => (
                <TableHead
                  key={h.key}
                  className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                >
                  {h.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasData ? (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {checkBox && (
                    <TableCell
                      className="w-10 md:w-15 px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={selected.includes(row.id ?? row._id)}
                        onCheckedChange={() => toggleRow(row.id ?? row._id)}
                      />
                    </TableCell>
                  )}

                  {headers.map((h) => {
                    const clickable = clickableFields.includes(h.key);

                    if (avatar && h.key === "name") {
                      return (
                        <TableCell
                          key={h.key}
                          className={clsx(columnStyles[h.key], "py-4")}
                        >
                          <div className="flex items-center gap-3">
                            {row.avatar ? (
                              <img
                                src={row.avatar}
                                alt={row.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                                {row.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </div>
                            )}
                            <div>{row?.name}</div>
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={h.key}
                        className={clsx(
                          columnStyles[h.key],
                          clickable && "text-blue-600 underline",
                          "px-6 py-4"
                        )}
                      >
                        {renderCell(row, h, clickable)}
                      </TableCell>
                    );
                  })}

                  {rowActionsConfig && (
                    <TableCell
                      className="px-4 py-2 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ActionButton
                        config={rowActionsConfig}
                        row={row}
                        handleAction={onAction}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    headers.length +
                    (checkBox ? 1 : 0) +
                    (rowActionsConfig ? 1 : 0)
                  }
                  className="py-20 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="font-medium">No Data Available</span>
                    <span className="text-xs text-gray-400">
                      There are no records to display
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        // card table
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4 w-full">
          {data.map((row) => (
            <div
              key={row.id ?? row._id}
              onClick={() => onRowClick?.(row)}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white cursor-pointer"
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  {avatar &&
                    row.name &&
                    (row.avatar ? (
                      <img
                        src={row.avatar}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-semibold">
                        {row.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    ))}
                  <div>
                    <div className="text-sm font-medium">{row.name}</div>
                    <div className="text-xs text-gray-500">
                      {row.id ?? row._id}
                    </div>
                  </div>
                </div>

                {rowActionsConfig && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ActionButton
                      config={rowActionsConfig}
                      row={row}
                      handleAction={onAction}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {headers.map((h) => {
                  if (["name", "id", "_id"].includes(h.key)) return null;

                  return (
                    <div key={h.key} className="flex justify-between text-sm">
                      <span className="text-gray-500">{h.header}</span>
                      {renderCell(row, h, clickableFields.includes(h.key))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {pagination && (
        <div
          className={`${
            resolvedVariant === "card"
              ? "w-[97%] border shadow-sm rounded-xl "
              : "w-full border-t py-1.5"
          } bg-white`}
        >
          <CustomPagination
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            totalValues={totalValues ?? data.length}
            variant={resolvedVariant}
            pageSizes={pageSizes}
          />
        </div>
      )}
    </div>
  );
};
export default TableComponent;
