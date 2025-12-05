import { Badge } from "../ui/badge";
import { FormPreview } from "@/app/models/form.model";


interface PreviewSidebarProps {
  entityType: string;
  formData: Record<string,unknown>;
  config?: (FormPreview)[];
}

export function PreviewSidebar({
  entityType,
  formData,
  config = [],
}: PreviewSidebarProps) {
  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Preview</h3>

        {config.map((item, idx) => {
          if ("fields" in item) {
            return (
              <div
                key={idx}
                className="pt-4 border-t border-gray-200 space-y-2"
              >
                {item.sectionName && (
                  <p className="text-sm font-semibold mb-2">
                    {item.sectionName}
                  </p>
                )}

                {item.fields.map((field) => {
                  const value: string = formData[field.key] as string?? "";

                  switch (field.type) {
                    case "text":
                      return (
                        <div
                          key={field.key}
                          className="flex items-center justify-between"
                        >
                          <p className="text-xs text-gray-500 mb-1">
                            {field.displayName}
                          </p>
                          <p className="text-xs text-gray-900 line-clamp-1">
                            {value || "-"}
                          </p>
                        </div>
                      );
                    case "badge":
                      return (
                        <div key={field.key}>
                          <p className="text-xs text-gray-500 mb-1">
                            {field.displayName}
                          </p>
                          <Badge
                            variant={value ? "default" : "secondary"}
                            className={
                              value
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {value ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            );
          }
          if (item.type === "heading") {
            const value = item.key ? formData[item.key] : null;
            const avatarUrl = item.avatarKey
              ? formData[item.avatarKey]?.[0]
              : null;
            return (
              <div key={item.key} className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={value || "Avatar"}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                      <item.icon className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-900 text-lg font-semibold">
                  {value || "Not set"}
                </p>
                <Badge
                  variant={formData.isActive ? "default" : "secondary"}
                  className="bg-teal-100 text-teal-700"
                >
                  {entityType.charAt(0).toUpperCase() + entityType.slice(1).toLowerCase()}

                </Badge>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
