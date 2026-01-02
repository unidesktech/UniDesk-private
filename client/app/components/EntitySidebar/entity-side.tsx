"use client";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { HandleAction } from "@/app/models/action.model";
import { EntitySidebarConfig } from "@/app/models/entity.sidebar.model";
import { fetchEntityTabData } from "@/app/services/entitySidebar.service";
import { formatLabel } from "@/app/utils/HelperFunction";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { X, Download } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface EntitySidebarProps {
  config: EntitySidebarConfig;
  item: Record<string, any>;
  onClose: () => void;
  onAction?: HandleAction;
}

export default function EntitySidebar({
  config,
  item,
  onClose,
  onAction,
}: EntitySidebarProps) {
  if (!config) return null;
  const role = "admin"; //add role based on store
  const [activeTab, setActiveTab] = useState(config.tabs[0].value);
  const [tabData, setTabData] = useState<Record<string, any>>({});
  const [tabLoading, setTabLoading] = useState<Record<string, boolean>>({});
  const [tabError, setTabError] = useState<Record<string, string | null>>({});

  const fetchTabData = useCallback(
    async (tabId: string, tabConfig: any) => {
      if (!tabConfig?.fetchFromApi) return;

      setTabLoading((p) => ({ ...p, [tabId]: true }));
      setTabError((p) => ({ ...p, [tabId]: null }));
      try {
        const data = await fetchEntityTabData({
          tabConfig,
          item,
        });

        setTabData((p) => ({ ...p, [tabId]: data }));
      } catch (error) {
        console.error(`Error fetching data for tab ${tabId}`, error);
        setTabError((p) => ({
          ...p,
          [tabId]: "Failed to load data. Please try again.",
        }));
      } finally {
        setTabLoading((p) => ({ ...p, [tabId]: false }));
      }
    },
    [item]
  );
  useEffect(() => {
    const activeTabConfig = config.tabs.find((tab) => tab.value === activeTab);
    if (activeTabConfig?.api && !tabData[activeTab] && !tabLoading[activeTab]) {
      fetchTabData(activeTab, activeTabConfig);
    }
  }, [activeTab, config.tabs, fetchTabData, tabData, tabLoading]);

  const renderActions = (actions: any[]) =>
    actions
      .filter(
        (action) =>
          !action.allowedRole || (role && action.allowedRole.includes(role))
      )
      .map((action, idx) => (
        <Button
          key={idx}
          variant={action.variant}
          size="sm"
          className={`gap-2 ${action.variant === "default" && "bg-black"} ${
            action.className
          }`}
          onClick={() =>
            onAction?.(
              action.action,
              action.actionValue,
              action.actionUse,
              item
            )
          }
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </Button>
      ));

  const renderTab = (tab: any) => {
    switch (tab.type) {
      case "fields":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              {tab.fields?.map((field: any) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-500 uppercase">
                    {field.label}
                  </label>
                  <div className="mt-1 text-sm flex gap-2">
                    {field.icon && (
                      <field.icon className="w-4 h-4 text-gray-400" />
                    )}
                    {item[field.key]}
                  </div>
                </div>
              ))}
            </div>

            {tab.stats && (
              <>
                <Separator className="my-4 border-t" />
                <div className="grid grid-cols-2 gap-3">
                  {tab.stats.map((stat: any) =>
                    tabLoading[tab.value] ? (
                      <Skeleton key={stat.key} className="h-6 w-full" />
                    ) : (
                      <div key={stat.key} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500">
                          {stat.label}
                        </div>
                        <div className="text-lg">
                          {tabData[tab.value]?.[stat.key] ?? "-"}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </>
        );

      case "details":
        return (
          <>
            {tab.fields?.map((f: any, i: number) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b text-sm"
              >
                <span className="text-gray-500">{f.label}</span>
                <span>{formatLabel(item[f.key])}</span>
              </div>
            ))}
          </>
        );

      case "activity":
        return (
          <>
            {tab.activities?.map((act: any, idx: number) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm">{act.action}</div>
                    <div className="text-xs text-gray-500">{item[act.key]}</div>
                  </div>
                </div>
              );
            })}
          </>
        );

      case "documents":
        if (tabLoading[tab.value]) {
          return <Skeleton className="h-8 w-full" />;
        }

        if (tabError[tab.value] || !tabData[tab.value]) {
          return (
            <div className="text-center py-4 text-gray-500">
              No Document available
            </div>
          );
        }

        return (
          <>
            {tabData[tab.value].map((doc: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="text-sm">{doc.name}</div>
                  <div className="text-xs text-gray-500">
                    {doc.size} • {doc.date}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fetch(doc.url)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white border-l border-gray-200 shadow-2xl flex flex-col z-50 animate-slide-in-right">
      <div className="shrink-0 px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item?.name ?? ""}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl">
                {item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <div>
              <h2 className="text-gray-900 mb-1">{item.name}</h2>
              <div className="text-sm text-gray-500">{item.id}</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {renderActions(config.quickActions)}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs
          defaultValue={config.tabs[0].value}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full flex  justify-evenly font-semibold text-sm px-6 bg-transparent border-b border-gray-200 h-12 gap-x-4">
            {config.tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-3 py-2 text-sm text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {config.tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="p-6 space-y-6"
            >
              {renderTab(tab)}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          {renderActions(config.footerActions)}
        </div>
      </div>
    </div>
  );
}
