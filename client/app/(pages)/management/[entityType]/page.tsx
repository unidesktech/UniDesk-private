"use client";
import { BreadcrumbComponent } from "@/app/components/Breadcrumb/BreadcrumbComponent";
import StatCard from "@/app/components/Cards/stat-card";
import { FilterBar } from "@/app/components/Table/filter-bar";
import { Button } from "@/app/components/ui/button";
import { managementConfig } from "@/app/config/management.config";
import useViewportMatch from "@/app/hooks/use-viewport-match";
import { formatLabel } from "@/app/utils/HelperFunction";
import { Download, Plus, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useHandleAction } from "@/app/hooks/use-handle-action";
import ModalRenderer from "@/app/components/Modal/modal-rendrer";
import { useParams } from "next/navigation";
import {
  getManagementList,
  getManagementStats,
} from "@/app/services/management.service";
import dynamic from "next/dynamic";
import TableComponent from "@/app/components/Table/table-component";
import { Skeleton } from "@/app/components/ui/skeleton";
import StatCardSkeleton from "@/app/components/SkeletonLoader/stat-card-skeleton";
const EntitySidebar = dynamic(() => import("./entity-side"), { ssr: false });

const page = () => {
  const params = useParams();
  const entityType = params?.entityType as string | undefined;
  const entityConfig = useMemo(() => {
    if (!entityType) return null;
    return managementConfig[entityType as keyof typeof managementConfig];
  }, [entityType]);

  if (!entityConfig) return null;

  const { header, cards, filters, table, sidebar } = entityConfig;
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [selected, setSelected] = useState<Record<string, any> | null>(null);
  const [filter, setFilter] = useState<Record<string, string>>({
    status: "all",
    class: "all",
    sortBy: "name",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const isDesktop = useViewportMatch(768);

  const [stats, setStats] = useState<any>(null);
  const [tableData, setTableData] = useState<any>(null);
  const [tableVersion, setTableVersion] = useState(0);
  const [statsVersion, setStatsVersion] = useState(0);
  const [statLoading, setStatLoading] = useState(false);

  useEffect(() => {
    if (!isDesktop) {
      setViewMode("card");
    } else {
      setViewMode("table");
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!entityType) return;
    const fetchStats = async () => {
      setStatLoading(true);
      setStats(null);
      try {
        const res = await getManagementStats(entityType);
        setStats(res);
      } finally {
        setStatLoading(false);
      }
    };
    fetchStats();
  }, [entityType, statsVersion]);

  useEffect(() => {
    if (!entityType) return;

    const fetchTable = async () => {
      const res = await getManagementList(entityType, page, limit, {
        // status: status !== "all" ? status : undefined,
        // class: classFilter !== "all" ? classFilter : undefined,
      });
      setTableData(res);
    };

    fetchTable();
  }, [entityType, page, limit, tableVersion]);

  const { handleAction, closeModal, modalProps } = useHandleAction();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <BreadcrumbComponent
          defaultRoute={{ label: "Dashboard", href: "dashboard" }}
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {header && (
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {header.title}
              </h1>
              <p className="text-sm text-gray-600">{header.subtitle}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2 cursor-pointer text-xs md:text-base"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="gap-2 cursor-pointer text-sm md:text-base"
            >
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button className="text-sm md:text-base gap-2 cursor-pointer bg-linear-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              <Plus className="w-4 h-4" />
              Add {formatLabel(String(entityType))}
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        {cards && (
          <div className="flex flex-wrap items-center gap-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[130px] md:min-w-[150px] lg::min-w-[180px] max-w-full"
              >
                {!statLoading && stats ? (
                  <StatCard
                    item={{
                      ...card,
                      label: stats?.[card.key ?? ""] || "0",
                    }}
                    styles={{
                      lableStyles: {
                        className:
                          "text-[1.1rem] md:text-[1.5rem] text-gray-900 order-2 mt-1",
                      },
                      valueStyle: {
                        className:
                          "text-[0.8rem] md:text-sm text-gray-600 -mt-2 text-nowrap",
                      },
                      IconContainerStyle: {
                        className: "w-8 md:w-12 h-8 md:h-12 rounded-lg order-1",
                      },
                      IconStyle: { className: "w-4 md:w-6 h-4 md:h-6" },
                      cardStyle: {
                        className:
                          "h-full hover:shadow-lg transition-all w-full",
                      },
                      containerStyle: {
                        className: "flex-col items-start justify-start gap-2",
                      },
                    }}
                  />
                ) : (
                  <StatCardSkeleton
                    styles={{
                      lableStyles: {
                        className: "!h-9 order-2 mt-1",
                      },
                      valueStyle: { className: "h-4 w-24" },
                      IconContainerStyle: {
                        className: "w-8 md:w-12 h-8 md:h-12 rounded-lg order-1",
                      },
                      IconStyle: { className: "w-4 md:w-6 h-4 md:h-6" },
                      containerStyle: {
                        className: "flex-col items-start justify-start gap-2",
                      },
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {filters && table && (
          <div className="space-y-4">
            <FilterBar
              config={filters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filter}
              onFiltersChange={setFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <TableComponent
              headers={table.headers}
              data={tableData?.data}
              checkBox
              avatar
              clickableFields={["name"]}
              pagination
              totalValues={tableData?.total ?? 0}
              rowActionsConfig={table.rowActions}
              onAction={handleAction}
              variant={viewMode}
              onRowClick={(v) => setSelected(v)}
              onPaginationChange={(newPage, newLimit) => {
                setPage(newPage);
                setLimit(newLimit);
              }}
              // pageSizes={viewMode}
            />
          </div>
        )}
      </div>
      {modalProps && (
        <ModalRenderer
          open={!!modalProps}
          modalProps={modalProps}
          onClose={closeModal}
          entityType={entityType ?? ""}
          onSuccess={() => {
            setStatsVersion((prev) => prev + 1);
            setTableVersion((prev) => prev + 1);
          }}
        />
      )}
      {selected && (
        <EntitySidebar
          config={sidebar}
          item={selected}
          onAction={handleAction}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};
export default page;
