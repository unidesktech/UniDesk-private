import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "@/app/components/ImgModule/image-with-fallback";
import { SchoolPreview } from "@/app/models/school.model";
import { authPage } from "@/app/config/auth.config";
import { login } from "@/app/services/auth.service";
import { getFormSchema } from "@/app/utils/zod";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/utils/toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/app.slice";

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

type FormDataType = Record<string, string>;
type ErrorType = Record<string, string | null>;

const Login = ({ schoolData }: { schoolData: SchoolPreview | null }) => {
  const config = authPage();

  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormDataType>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({});

  const authSchema = useMemo(
    () => getFormSchema(config.fields ?? []),
    [config.fields]
  );

  const disableButton =
    isLoading ||
    config.fields.some((f) => !formData[f.name]) ||
    Object.values(error).some((e) => e);

  useEffect(() => {
    if (!schoolData) return;

    config.fields.map((field) => {
      setFormData({ ...formData, [field.name]: "", code: schoolData.code });
    });
  }, []);

  const handleBlur = (field: FieldConfig) => {
    const authFieldSchema = authSchema.shape[field.name];
    if (!authFieldSchema) return;
    const result = authFieldSchema.safeParse(formData[field.name]);
    if (!result.success) {
      setError((prev) => ({
        ...prev,
        [field.name]: result.error.issues[0]?.message,
      }));
    } else {
      setError((prev) => {
        const updated = { ...prev };
        delete updated[field.name];
        return updated;
      });
    }
  };

  const handleChange = (field: FieldConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));

    // const timer = setTimeout(() => validate(), 500);
    // return () => clearTimeout(timer);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = authSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) fieldErrors[key] = issue.message;
      });
      setError(fieldErrors);
      return;
    }
    setError({});
    setIsLoading(true);
    if (disableButton) return;
    setIsLoading(true);

    showToast("Signing in...", { isLoading: true, id: "login-toast" });

    const res = await login(formData);

    if (res.success) {
      showToast("Login successful!", "success", { id: "login-toast" });
      const userBasicInfo = {
        user_id: res.data.user_id,
        user_code: res.data.user_code,
        name: res.data.name,
        email: res.data.email,
      }
      dispatch(setUser(userBasicInfo))
      router.push("/");
    } else {
      showToast(
        res.message || "Login failed. Please try again.",
        "error",
        { id: "login-toast" }
      );
    }

    setIsLoading(false);
  };

  if (!schoolData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.location.reload()}
        className="absolute top-6 left-6 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-transform duration-200 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        <span className="text-sm text-slate-700 dark:text-slate-300 hidden sm:inline">
          Back
        </span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-xl mb-4 overflow-hidden"
          >
            <ImageWithFallback
              src={schoolData.logo_url}
              alt={schoolData.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl mb-2 text-slate-900 dark:text-white">
            {schoolData.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {config.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <div className="relative p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                {config.fields.map((field: FieldConfig, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <label
                      htmlFor={field.name}
                      className="block text-sm text-slate-700 dark:text-slate-300 font-semibold"
                    >
                      {field.label}
                    </label>

                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <field.icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      </div>

                      <input
                        id={field.name}
                        type={
                          showPassword && field.name === "password"
                            ? "text"
                            : field.type
                        }
                        value={formData[field.name] ?? ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                        onBlur={() => handleBlur(field)}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-current focus:ring-4 focus:ring-current/10 outline-none transition-all text-slate-900 dark:text-white"
                      />

                      {field.name === "password" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-slate-500" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      )}
                    </div>
                    {error[field.name] && (
                      <span className="text-red-500 text-xs -mt-1">
                        {error[field.name]}
                      </span>
                    )}
                  </div>
                ))}

                <button
                onClick={() => router.push('/auth/forget-password')}
                  type="button"
                  className="text-slate-600 bg-primary-color cursor-pointer dark:text-slate-400 hover:opacity-80 transition-opacity"
                >
                  Forgot password?
                </button>

                <motion.button
                  type="submit"
                  disabled={disableButton}
                  whileHover={{ scale: disableButton ? 1 : 1.02 }}
                  whileTap={{ scale: disableButton ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden shadow-lg ${
                    disableButton
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary cursor-pointer"
                  }`}
                >
                  <span>{isLoading ? "Signing in..." : "Sign in"}</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
