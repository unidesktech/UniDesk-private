"use client";
import { GraduationCap, Loader2Icon, Send } from "lucide-react";
import { ImageWithFallback } from "@/app/components/ImgModule/image-with-fallback";
import { requestDemoConfig } from "@/app/config/request-demo.config";
import CardRenderer from "@/app/components/Cards/card-renderer";
import { useMemo, useState } from "react";
import { getFormSchema } from "@/app/utils/zod";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldProps } from "@/app/models/form.model";
import { saveDemo } from "@/app/services/request-demo.service";
import { showToast } from "@/app/utils/toast";
import { FormFieldRenderer } from "@/app/components/Form/form-field-rendrer";

export default function RequestDemo() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const sectionsByType = useMemo(() => {
    return requestDemoConfig.sections.reduce((acc: any, section: any) => {
      acc[section.type] = section;
      return acc;
    }, {} as Record<string, (typeof requestDemoConfig.sections)[number]>);
  }, []);

  const { HeroSection, requestForm } = sectionsByType;

  const formSchema = useMemo(
    () => getFormSchema(requestForm.form.sections ?? []),
    [requestForm.form.sections]
  );
  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleBlur = (field: FieldProps) => {
    const fieldSchema = formSchema.shape[field.name];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(formData[field.name]);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field.name]: result.error.issues[0]?.message,
      }));
      setDisabled(true);
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field.name];
        return updated;
      });
      setDisabled(false);
    }
  };

  const handleSubmit = async () => {
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setDisabled(true);
    } else {
      setErrors({});
      setDisabled(false);
      try {
        setLoading(true);
        const res = await saveDemo(formData);
        if (res.status) {
          showToast("Demo request submitted", "success");
          setFormData({});
        } else {
          showToast("Demo request submission failed", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Demo request submission failed", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-teal-50 py-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
        {HeroSection && (
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <h1 className="text-5xl text-gray-900 mb-6">
                  {HeroSection.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {HeroSection.desc}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  {HeroSection.points.map((point: string) => (
                    <div className="flex items-center gap-2" key={point}>
                      <div
                        className={`w-2 h-2 ${
                          point.includes("No credit card")
                            ? "bg-teal-600"
                            : "bg-blue-600"
                        } rounded-full`}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right - Illustration */}
              <div className="hidden lg:block">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                  <ImageWithFallback
                    src={HeroSection.image.src}
                    alt={HeroSection.image.alt}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {requestForm && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {requestForm.form && (
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                    <h2 className="text-3xl text-gray-900 mb-2">
                      {requestForm.title}
                    </h2>
                    <p className="text-gray-600 mb-8">{requestForm.desc}</p>
                    <form className="space-y-6">
                      {requestForm.form.sections.map(
                        (section: any, idx: number) => (
                          <FormFieldRenderer
                            section={section || []}
                            formData={formData}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            key={idx}
                          />
                        )
                      )}
                      <Button
                        type="button"
                        className="w-full h-12 bg-linear-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl shadow-lg shadow-blue-600/30"
                        onClick={handleSubmit}
                        disabled={disabled}
                      >
                        {!loading ? (
                          <Send className="w-5 h-5 mr-2" />
                        ) : (
                          <Loader2Icon className="mr-2 animate-spin" />
                        )}
                        Schedule Demo
                      </Button>
                      <p className="text-sm text-gray-500 text-center">
                        {requestForm.form.bottomText}
                      </p>
                    </form>
                  </div>
                </div>
              )}
              {requestForm.helpSection && (
                <div className="lg:col-span-1">
                  <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-8">
                    <h3 className="text-xl text-gray-900 mb-4">
                      {requestForm.helpSection.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {requestForm.helpSection.desc}
                    </p>

                    <div className="space-y-4">
                      {requestForm.helpSection.items.map(
                        (item: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white rounded-xl p-4 border border-gray-200"
                          >
                            <p className="text-sm text-gray-500 mb-1">
                              {item.label}
                            </p>
                            <a
                              href={item.href}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              {item.value}
                            </a>
                          </div>
                        )
                      )}
                      {requestForm.helpSection.button && (
                        <Button
                          variant="outline"
                          className="w-full h-11 rounded-xl border-gray-300 hover:bg-white"
                          onClick={() =>
                            router.push(requestForm.helpSection.button.action)
                          }
                        >
                          {requestForm.helpSection.button.label}
                        </Button>
                      )}
                    </div>

                    {requestForm.helpSection.officeHours && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>
                            {requestForm.helpSection.officeHours.label}
                          </strong>
                          <br />
                          {requestForm.helpSection.officeHours.value}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {requestDemoConfig.sections.map((section: any, idx: number) => {
        if (section.type === "HeroSection" || section.type === "requestForm")
          return;
        return (
          <section key={idx} className={section?.styles?.className}>
            {section.title && (
              <div className="text-center mb-8">
                {section.title && (
                  <h2
                    style={section?.styles?.titleStyles?.inlineStyles || {}}
                    className={`text-xl md:text-3xl lg:text-4xl text-gray-900 md:mb-4 ${section?.styles?.titleStyles?.className}`}
                  >
                    {section.title}{" "}
                    <span className="text-blue-600">{section.title2}</span>
                  </h2>
                )}
                {section.desc && (
                  <p
                    style={section?.styles?.descStyles?.inlineStyles || {}}
                    className={`text-sm md:text-xl text-gray-600 max-w-2xl mx-auto ${section?.styles?.descStyles?.className}`}
                  >
                    {section.desc}
                  </p>
                )}
              </div>
            )}
            {idx === 2 && (
              <div className="max-w-7xl mx-auto px-8">
                <CardRenderer config={section} />
              </div>
            )}
            {section.type === "trustIcon" && (
              <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-12">
                  <p className="text-gray-600 mb-8">{section.text}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {section.items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <GraduationCap className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="max-w-3xl mx-auto mt-12">
                  <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl border border-gray-200 shadow-md p-8 text-center">
                    <p className="text-lg text-gray-700 italic mb-4">
                      "{section.testimonialText}"
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white">
                          {section.testimonialName
                            .split(" ")
                            .map((n: string) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900">
                          {section.testimonialName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {section.testimonialPosition}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {idx === 4 && (
              <div className="max-w-7xl mx-auto px-8">
                <CardRenderer config={section} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}