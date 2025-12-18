"use client";
import { Button } from "@/app/components/ui/button";
import { HandleAction } from "@/app/models/action.model";
import { EntitySidebarConfig } from "@/app/models/entity.sidebar.model";
import { formatLabel } from "@/app/utils/HelperFunction";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { X, Download } from "lucide-react";

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
          {config.quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant}
              size="sm"
              className={`gap-2 ${
                action.variant === "default" && "bg-black flex-1"
              }`}
              onClick={() =>
                onAction?.(
                  action.action!,
                  action.actionValue,
                  action.actionUse,
                  item
                )
              }
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue={config.tabs[0].value} className="w-full">
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
              {tab.type === "fields" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {tab?.fields?.map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-gray-500 uppercase tracking-wider">
                          {field.label}
                        </label>
                        <div className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                          {field.icon && (
                            <field.icon className="w-4 h-4 text-gray-400" />
                          )}
                          {item[field.key]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4 border-t border-gray-200" />
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">
                    Quick Stats
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {tab.stats?.map((stat) => (
                      <div key={stat.key} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500">
                          {stat.label}
                        </div>
                        <div className="text-lg text-gray-900 mt-1">
                          {item[stat.key] || "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {tab.type === "details" &&
                tab.fields?.map((f, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="text-sm text-gray-500 capitalize">
                      {f.label}
                    </span>
                    <span className="text-sm text-gray-900">
                      {formatLabel(item[f.key])}
                    </span>
                  </div>
                ))}
              {tab.type === "activity" &&
                tab.activities?.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">
                          {act.action}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {act.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {tab.type === "documents" &&
                tab.documents?.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{doc.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {doc.size} • {doc.date}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer Actions */}
      <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          {config.footerActions.map((action, idx) => (
            <Button
              key={idx}
              variant={action.variant}
              className={`flex-1 gap-2 ${
                action.variant === "default" && "bg-black"
              } ${action.className}`}
              onClick={() =>
                onAction?.(
                  action.action!,
                  action.actionValue,
                  action.actionUse,
                  item
                )
              }
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
