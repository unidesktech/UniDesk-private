"use client";

import Dropdown from "../Dropdown/Dropdown";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface CustomPaginationProps {
  totalValues: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  pageSizes?: number[];
  variant?:string
}

const CustomPagination = ({
  totalValues,
  page,
  limit = 5,
  setPage,
  setLimit,
  pageSizes = [5, 10, 25, 50],
  variant
}: CustomPaginationProps) => {
  const totalPages = Math.ceil(totalValues / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(start + limit - 1, totalValues);
  const boundaryCount = 1;
  const siblingCount = 1;
  const pages: (number | "ellipsis")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i <= boundaryCount ||
      i > totalPages - boundaryCount ||
      (i >= page - siblingCount && i <= page + siblingCount)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <div className="px-6 py-2 w-full flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:text-center sm:justify-center gap-2 ">
        <div className="text-sm text-gray-600 text-center md:text-left">
          Showing <span className="text-gray-900 font-semibold">{start}</span> to{" "}
          <span className="text-gray-900 font-semibold">{end}</span> of{" "}
          <span className="text-gray-900 font-semibold">{totalValues}</span> results
        </div>

        {totalPages && (
          <div className="flex items-center justify-center md:justify-baseline gap-2">
            <span className="text-sm text-gray-700 text-nowrap">
              {variant==="card" ? "Cards per page" : "Rows per page:"}
            </span>
            <div className="max-w-20">
              <Dropdown
                value={limit}
                onChange={(v: any) => {
                  setLimit(Number(v));
                  setPage(1);
                }}
                options={pageSizes.map((size) => ({
                  id: size,
                  value: size.toString(),
                }))}
              />
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-start md:justify-end w-full md:w-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  onClick={() => setPage(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pages.map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                      className={
                        p === page
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "hover:bg-gray-50 border"
                      }
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  onClick={() => setPage(page + 1)}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
