import z from "zod";

const getSchemaForField = (field: any) => {
  let schema: any;

  switch (field.type) {
    case "text":
    case "textarea":
      schema = z.string().trim().optional();
      if (field.maxLength)
        schema = schema.max(
          field.maxLength,
          `${field.label} must not exceed ${field.maxLength} characters`
        );
      if (field.pattern)
        schema = schema.regex(
          new RegExp(field.pattern),
          `${field.label} is invalid`
        );
      if (field.required) {
        schema = z
          .string()
          .trim()
          .optional()
          .refine((val) => !(val === "" || val === undefined), {
            message: `${field.label} is required`,
          });
      }
      break;

    case "number":
      schema = z.coerce.number().optional();
      if (field.min)
        schema = schema.refine(
          (val: number | undefined) => val === undefined || val >= field.min,
          { message: `${field.label} cannot be less than ${field.min}` }
        );
      if (field.max)
        schema = schema.refine(
          (val: number | undefined) => val === undefined || val <= field.max,
          { message: `${field.label} cannot be greater than ${field.max}` }
        );
      if (field.required) {
        schema = schema.refine(
          (val: number | undefined) => val !== undefined && val !== null,
          { message: `${field.label} is required` }
        );
      }
      break;

    case "email":
      schema = z.string().email("Invalid email format").optional();
      if (field.required) {
        schema = schema.refine(
          (val: string | undefined) => !val || val.trim() !== "",
          { message: `${field.label} is required` }
        );
      }
      break;

    case "dropdown":
      schema = z.any();
      if (!field.required) schema = schema.optional();
      if (field.required) {
        schema = schema.refine(
          (val: any) => val !== undefined && val !== null && val !== "",
          `${field.label} is required`
        );
      }
      break;

    case "date":
      schema = z.date().optional();
      if (field.required) {
        schema = schema.refine(
          (val: Date | undefined) =>
            val === undefined || val === null ? true : !!val,
          { message: `${field.label} is required` }
        );
      }
      if (field.min)
        schema = schema.refine(
          (val: Date | undefined) => !val || val >= new Date(field.min),
          { message: `${field.label} must be after ${field.min}` }
        );
      if (field.max)
        schema = schema.refine(
          (val: Date | undefined) => !val || val <= new Date(field.max),
          { message: `${field.label} must be before ${field.max}` }
        );
      break;

    case "uploadbox":
      schema = z.array(z.any()).optional();
      if (field.required) {
        schema = schema.refine(
          (val: any) => (!val || val.length === 0 ? true : val.length > 0),
          { message: `${field.label} is required` }
        );
      }
      break;

    default:
      schema = z.any();
  }

  return schema;
};

export const getFormSchema = (sections: any[]) => {
  const formSchema: any = {};
  sections?.forEach((section) =>
    section.fields?.forEach((field: any) => {
      formSchema[field.name] = getSchemaForField(field);
    })
  );
  return z.object(formSchema);
};
